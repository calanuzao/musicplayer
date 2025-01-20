import { Track } from '../types/music';

class FavoritesService {
  private readonly STORAGE_KEY = 'favorites';

  // Get all favorite tracks from localStorage
  getFavorites(): Track[] {
    const favoritesJson = localStorage.getItem(this.STORAGE_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

  // Add a track to favorites
  addToFavorites(track: Track): void {
    const favorites = this.getFavorites();
    if (!favorites.some(t => t.id === track.id)) {
      favorites.push(track);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    }
  }

  // Remove a track from favorites
  removeFromFavorites(trackId: string): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(track => track.id !== trackId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFavorites));
  }

  // Check if a track is in favorites
  isFavorite(trackId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(track => track.id === trackId);
  }
}

export const favoritesService = new FavoritesService(); 