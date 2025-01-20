// creates favorite services

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Track } from '../types/music';

const FAVORITES_KEY = '@favorites';

export const getFavorites = async (): Promise<Track[]> => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const toggleFavorite = async (track: Track): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    const isFavorite = favorites.some(fav => fav.id === track.id);
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== track.id);
    } else {
      newFavorites = [...favorites, track];
    }
    
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return !isFavorite; // Return true if added to favorites, false if removed
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

export const isFavorite = async (trackId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some(track => track.id === trackId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
}; 