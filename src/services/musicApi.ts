// api service to handle spotify api calls 

import { Track, SearchResponse } from '../types/music';
import axios from 'axios';
import { spotifyService } from './spotify';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const SPOTIFY_ACCOUNTS_URL = 'https://accounts.spotify.com/api/token';
const ITUNES_API_URL = 'https://itunes.apple.com/search';

interface iTunesSearchResult {
  previewUrl: string;
  artistName: string;
  trackName: string;
}

class MusicApiService {
  private token: string = '';
  private tokenExpirationTime: number = 0;
  private readonly clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  private readonly clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  // I'm creating a method to search iTunes for preview URLs
  private async searchiTunes(artist: string, trackName: string): Promise<string | undefined> {
    try {
      const query = `${artist} ${trackName}`.replace(/[^\w\s]/g, '');
      const response = await axios.get(`${ITUNES_API_URL}`, {
        params: {
          term: query,
          media: 'music',
          limit: 1
        }
      });

      const results = response.data.results as iTunesSearchResult[];
      return results[0]?.previewUrl;
    } catch (error) {
      console.error('Error searching iTunes:', error);
      return undefined;
    }
  }

  // I'm creating a method to enhance track data with iTunes preview URLs
  private async enhanceWithPreview(track: Track): Promise<Track> {
    if (!track.previewUrl) {
      const previewUrl = await this.searchiTunes(track.artist, track.name);
      if (previewUrl) {
        return { ...track, previewUrl };
      }
    }
    return track;
  }

  // I'm creating a method to search tracks with enhanced preview URLs
  async searchTracks(query: string): Promise<Track[]> {
    const spotifyTracks = await spotifyService.searchTracks(query);
    const enhancedTracks = await Promise.all(
      spotifyTracks.map(track => this.enhanceWithPreview(track))
    );
    return enhancedTracks;
  }

  // I'm creating a method to get track details with enhanced preview URL
  async getTrackDetails(trackId: string): Promise<Track> {
    const track = await spotifyService.getTrackDetails(trackId);
    return this.enhanceWithPreview(track);
  }
}

export const musicApiService = new MusicApiService(); 