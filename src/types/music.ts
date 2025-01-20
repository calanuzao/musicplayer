// deines typescript interface and sets up the api integration
export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  previewUrl: string;
}

export interface SearchResponse {
  tracks: Track[];
}

export interface SearchState {
  query: string;
  results: Track[];
  isLoading: boolean;
  error?: string;
} 