import React from 'react';
import './musiccard.css';

// I'm defining the Track interface for type safety
interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  previewUrl?: string;
}

// I'm creating a component to display individual music tracks
const MusicCard: React.FC<{ track: Track; onPlay?: () => void; onSelect?: () => void }> = ({
  track,
  onPlay,
  onSelect
}) => {
  return (
    <div className="music-card" onClick={onSelect}>
      <img src={track.albumArt} alt={`${track.name} album art`} className="album-art" />
      <div className="track-info">
        <h3 className="track-name">{track.name}</h3>
        <p className="artist-name">{track.artist}</p>
        <p className="album-name">{track.album}</p>
        {track.previewUrl && (
          <button className="preview-button" onClick={(e) => {
            e.stopPropagation();
            onPlay?.();
          }}>
            ▶️ Play Preview
          </button>
        )}
      </div>
    </div>
  );
};

export default MusicCard;