// implements the search screen with the search bar as well as results list
// review code architecture

import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { searchMusic } from '../services/MusicService';
import MusicCard from '../components/MusicCard';
import { Track } from '../types/MusicTypes';

const searchscreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Track[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                const data = await searchMusic(query);
                setResults(data);
            } else {
                setResults([]);
            }
        };
        fetchData();
    }, [query]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for music..."
                value={query}
                onChangeText={setQuery}
            />
            <FlatList
                data={results}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { track: item })}>
                        <MusicCard track={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default searchcreen;