import React, { useState, useEffect } from 'react';
import { Track } from '../types/music';
import { favoritesService } from '../services/favorites';
import './MusicCard.css';

interface MusicCardProps {
  track: Track;
  onSelect?: () => void;
  onPlay?: () => void;
}

const MusicCard: React.FC<MusicCardProps> = ({ track, onSelect, onPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favoritesService.isFavorite(track.id));
  }, [track.id]);

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click

    if (!track.previewUrl) {
      return;
    }

    if (isPlaying && audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setAudio(null);
    } else {
      const newAudio = new Audio(track.previewUrl);
      newAudio.addEventListener('ended', () => {
        setIsPlaying(false);
        setAudio(null);
      });
      newAudio.play();
      setIsPlaying(true);
      setAudio(newAudio);
    }

    onPlay?.();
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click

    if (isFavorite) {
      favoritesService.removeFromFavorites(track.id);
    } else {
      favoritesService.addToFavorites(track);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="music-card" onClick={onSelect}>
      <div className="favorite-button-container">
        <button
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <img
        src={track.albumArt || 'https://via.placeholder.com/300/1db954/ffffff?text=🎵'}
        alt={`${track.name} album art`}
        className="album-art"
      />
      <div className="track-info">
        <h3 className="track-name">{track.name}</h3>
        <p className="artist-name">{track.artist}</p>
        <p className="album-name">{track.album}</p>
      </div>
      {track.previewUrl && (
        <button
          className={`preview-button ${isPlaying ? 'playing' : ''}`}
          onClick={handlePreviewClick}
        >
          {isPlaying ? 'Stop Preview' : 'Play Preview'}
        </button>
      )}
    </div>
  );
};

export default MusicCard;