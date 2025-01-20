import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Track } from '../types/music';
import { musicApiService } from '../services/musicApi';
import MusicCard from '../components/musiccard';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setTracks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await musicApiService.searchTracks(searchQuery);
      setTracks(results);
    } catch (err) {
      setError('Failed to search tracks. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, handleSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleTrackSelect = (track: Track) => {
    navigate(`/track/${track.id}`);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search for songs..."
            value={query}
            onChange={handleInputChange}
            autoFocus
          />
        </div>

        <div className="search-results">
          {loading && (
            <div className="loading">
              <div className="loading-spinner" />
              <p>Searching...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && tracks.length === 0 && query && (
            <div className="no-results">
              <h2>No results found</h2>
              <p>Try searching for something else</p>
            </div>
          )}

          {!loading && !error && tracks.length > 0 && (
            <div className="results-grid">
              {tracks.map(track => (
                <MusicCard
                  key={track.id}
                  track={track}
                  onSelect={() => handleTrackSelect(track)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 