// implements the search functionality with the search bar as well as results list
// review code architecture

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { TabScreenProps } from '../navigation/types';
import { Track, SearchState } from '../types/music';
import { searchTracks } from '../services/musicApi';

const SearchScreen: React.FC<TabScreenProps<'SearchTab'>> = ({ navigation }) => {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    isLoading: false,
  });

  const handleSearch = async (text: string) => {
    setState(prev => ({ ...prev, query: text }));
    
    if (text.trim().length === 0) {
      setState(prev => ({ ...prev, results: [], isLoading: false }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await searchTracks(text);
      setState(prev => ({
        ...prev,
        results: response.tracks,
        isLoading: false,
        error: undefined,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        results: [],
        isLoading: false,
        error: 'Failed to fetch results',
      }));
    }
  };

  const renderItem = ({ item }: { item: Track }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => navigation.navigate('Details', { track: item })}
    >
      <Image source={{ uri: item.albumArt }} style={styles.albumArt} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackName}>{item.name}</Text>
        <Text style={styles.artistName}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for songs or artists..."
        value={state.query}
        onChangeText={handleSearch}
      />
      
      {state.isLoading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : state.error ? (
        <Text style={styles.error}>{state.error}</Text>
      ) : (
        <FlatList
          data={state.results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    margin: 10,
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  trackItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  trackInfo: {
    marginLeft: 15,
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: '600',
  },
  artistName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;