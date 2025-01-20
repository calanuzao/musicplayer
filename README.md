# Music Player Project
## Project Branches

This repository contains two main branches:
- `main`: Contains the React Native mobile application version (current documentation)
- `web-version`: Contains the React web application version 

# iOS App

A React Native mobile application that allows users to search for music using the Spotify API, play song previews, and manage favorites.

![Demo](demo.gif)

## Features

- Search for songs using Spotify's extensive music database
- Play song previews (using iTunes preview URLs)
- Add/remove songs to favorites
- Beautiful and intuitive user interface
- Persistent storage for favorites

## Installation

1. Clone the repository:
```bash
git clone https://github.com/calanuzao/musicplayer.git
cd musicplayer
```

2. Install dependencies:
```bash
npm install
cd ios && pod install && cd ..
```

3. Create a `.env` file in the root directory with your Spotify API credentials:
```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

4. Start the Metro bundler:
```bash
npm start
```

5. Run the app:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Design Decisions

### Architecture
- **TypeScript**: Used throughout the project for type safety and better developer experience
- **React Navigation**: Implemented bottom tabs and stack navigation for intuitive user flow
- **Hybrid API Approach**: Uses Spotify API for rich metadata and iTunes API for reliable preview URLs

### Major Libraries
- `@react-navigation/native` and `@react-navigation/bottom-tabs` for navigation
- `@react-native-async-storage/async-storage` for persistent storage
- `react-native-sound` for audio playback
- `react-native-gesture-handler` for touch interactions
- `react-native-safe-area-context` for safe area handling

### State Management
- Local state with React hooks for component-level state
- AsyncStorage for persistent data (favorites)
- Custom services for API interactions and favorites management

## Limitations and Future Improvements

### Current Limitations
1. Preview availability depends on iTunes matching
2. No offline support
3. Limited error handling for network issues
4. No audio queue management for consecutive previews

### Future Improvements
1. **Enhanced Audio Features**
   - Progress bar for previews
   - Volume control
   - Background audio playback

2. **User Experience**
   - Playlist creation
   - Advanced search filters
   - Better error messages
   - Loading states for audio

3. **Technical Improvements**
   - Implement caching for search results
   - Add unit and integration tests
   - Improve preview matching algorithm
   - Add offline support
   - Implement proper error boundaries

4. **Additional Features**
   - User authentication
   - Social sharing
   - Lyrics display
   - Related songs recommendations
