// implements the search screen with the search bar as well as results list
// review code architecture

import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { searchMusic } from '../services/musicservice';
import MusicCard from '../components/musiccard';
import { Track } from '../types/musictypes';

const SearchScreen = ({ navigation }) => {
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
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
});

export default SearchScreen;