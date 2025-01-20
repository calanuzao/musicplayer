import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
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
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Music Player</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/track/:id" element={<DetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 