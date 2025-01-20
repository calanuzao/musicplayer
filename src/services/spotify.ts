import axios from 'axios';
import { Track } from '../types/music';

// I'm creating a class to handle Spotify API calls
class SpotifyService {
  private token: string = '';
  private tokenExpirationTime: number = 0;
  private readonly clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  private readonly clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  // I'm creating a method to get the access token
  private async getAccessToken(): Promise<string> {
    if (Date.now() < this.tokenExpirationTime && this.token) {
      return this.token;
    }

    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');

      const response = await axios.post('https://accounts.spotify.com/api/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
        }
      });

      this.token = response.data.access_token;
      this.tokenExpirationTime = Date.now() + (response.data.expires_in * 1000);
      return this.token;
    } catch (error) {
      console.error('Error getting Spotify access token:', error);
      throw error;
    }
  }

  // I'm creating a method to search for tracks
  async searchTracks(query: string): Promise<Track[]> {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        params: {
          q: query,
          type: 'track',
          limit: 20
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.data.tracks.items.map((track: any) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        albumArt: track.album.images[0]?.url || '',
        previewUrl: track.preview_url
      }));
    } catch (error) {
      console.error('Error searching tracks:', error);
      throw error;
    }
  }

  // I'm creating a method to get track details
  async getTrackDetails(trackId: string): Promise<Track> {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const track = response.data;
      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        albumArt: track.album.images[0]?.url || '',
        previewUrl: track.preview_url
      };
    } catch (error) {
      console.error('Error getting track details:', error);
      throw error;
    }
  }
}

export const spotifyService = new SpotifyService(); 