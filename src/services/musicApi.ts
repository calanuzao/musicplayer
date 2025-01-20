// api service to handle spotify api calls 

import { Track, SearchResponse } from '../types/music';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@env';
import { Buffer } from 'buffer';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const SPOTIFY_ACCOUNTS_URL = 'https://accounts.spotify.com/api/token';
const ITUNES_API_URL = 'https://itunes.apple.com/search';

let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

const getAccessToken = async (): Promise<string> => {
  // Check if we have a valid token
  if (accessToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  try {
    const response = await fetch(SPOTIFY_ACCOUNTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    const newToken = data.access_token;
    if (!newToken) {
      throw new Error('No access token received');
    }
    
    accessToken = newToken;
    // Set expiration time 5 minutes before actual expiration to be safe
    tokenExpirationTime = Date.now() + (data.expires_in - 300) * 1000;
    
    return newToken;
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Failed to authenticate with Spotify');
  }
};

const getPreviewUrl = async (trackName: string, artistName: string): Promise<string> => {
  try {
    const query = `${trackName} ${artistName}`.replace(/[^\w\s]/gi, '');
    const response = await fetch(
      `${ITUNES_API_URL}?term=${encodeURIComponent(query)}&media=music&entity=song&limit=1`
    );
    
    if (!response.ok) {
      return '';
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].previewUrl || '';
    }
    
    return '';
  } catch (error) {
    console.error('Preview URL fetch error:', error);
    return '';
  }
};

export const searchTracks = async (query: string): Promise<SearchResponse> => {
  try {
    const token = await getAccessToken();
    const response = await fetch(
      `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch tracks');
    }

    const data = await response.json();
    
    // Map tracks and fetch preview URLs
    const tracks: Track[] = await Promise.all(
      data.tracks.items.map(async (item: any) => {
        const previewUrl = await getPreviewUrl(item.name, item.artists[0].name);
        return {
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          albumArt: item.album.images[0]?.url || '',
          previewUrl,
        };
      })
    );

    return { tracks };
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to search tracks');
  }
}; 