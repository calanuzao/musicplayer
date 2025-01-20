// favorites screen

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { TabScreenProps } from '../navigation/types';
import { Track } from '../types/music';
import { getFavorites } from '../services/favoritesService';

const FavoritesScreen: React.FC<TabScreenProps<'FavoritesTab'>> = ({ navigation }) => {
    const [favorites, setFavorites] = useState<Track[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        const favoriteTracks = await getFavorites();
        setFavorites(favoriteTracks);
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
            {favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No favorite tracks yet</Text>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => navigation.navigate('Search')}
                    >
                        <Text style={styles.searchButtonText}>Search for Music</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={favorites}
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
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    searchButton: {
        backgroundColor: '#1DB954',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default FavoritesScreen; 