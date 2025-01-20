import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Track } from '../types/music';
import { favoritesService } from '../services/favorites';
import MusicCard from '../components/MusicCard';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Track[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load favorites when component mounts
    setFavorites(favoritesService.getFavorites());
  }, []);

  const handleTrackSelect = (track: Track) => {
    navigate(`/track/${track.id}`);
  };

  const handleRemoveFromFavorites = (trackId: string) => {
    favoritesService.removeFromFavorites(trackId);
    setFavorites(favoritesService.getFavorites());
  };

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <h1>Your Favorites</h1>
        {favorites.length === 0 ? (
          <div className="no-favorites">
            <p>You haven't added any favorites yet.</p>
            <button onClick={() => navigate('/')}>Search for Music</button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map(track => (
              <div key={track.id} className="favorite-item">
                <MusicCard
                  track={track}
                  onSelect={() => handleTrackSelect(track)}
                />
                <button
                  className="remove-favorite"
                  onClick={() => handleRemoveFromFavorites(track.id)}
                >
                  Remove from Favorites
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; 