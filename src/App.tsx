import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

// I'm creating a sample track for testing
const sampleTrack = {
  id: '1',
  name: 'Sample Track',
  artist: 'Sample Artist',
  album: 'Sample Album',
  albumArt: 'https://via.placeholder.com/100',
  previewUrl: 'https://example.com/preview.mp3'
};

// I'm creating the main App component that will handle routing
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/" className="nav-link">Search</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/track/:id" element={<DetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 