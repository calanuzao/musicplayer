import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Track } from '../types/music';
import { musicApiService } from '../services/musicApi';
import './DetailsPage.css';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [track, setTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      if (!id) return;

      try {
        const trackData = await musicApiService.getTrackDetails(id);
        setTrack(trackData);
      } catch (err) {
        setError('Failed to load track details');
        console.error('Error fetching track:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, [id]);

  useEffect(() => {
    // Cleanup audio on component unmount
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePreviewClick = () => {
    if (!track?.previewUrl) return;

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
  };

  if (loading) {
    return (
      <div className="details-page">
        <div className="loading">
          <div className="loading-spinner" />
          <p>Loading track details...</p>
        </div>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="details-page">
        <div className="error">
          <p>{error || 'Track not found'}</p>
          <button onClick={handleBack}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <button className="back-button" onClick={handleBack}>
        ← Back
      </button>
      <div className="track-details">
        <img
          src={track.albumArt || 'https://via.placeholder.com/300/1db954/ffffff?text=🎵'}
          alt={`${track.name} album art`}
          className="album-art"
        />
        <div className="info">
          <h1 className="track-name">{track.name}</h1>
          <p className="artist-name">{track.artist}</p>
          <p className="album-name">{track.album}</p>
          {track.previewUrl && (
            <button
              className={`preview-button ${isPlaying ? 'playing' : ''}`}
              onClick={handlePreviewClick}
            >
              {isPlaying ? 'Stop Preview' : 'Play Preview'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage; 