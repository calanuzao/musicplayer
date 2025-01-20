// displays individual music tracks
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Track } from '../types/musictypes';

const MusicCard = ({ track }: { track: Track }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: track.artworkUrl }} style={styles.image} />
            <Text style={styles.trackName}>{track.name}</Text>
            <Text style={styles.artistName}>{track.artist}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    trackName: {
        fontWeight: 'bold',
    },
    artistName: {
        color: 'gray',
    },
});

export default MusicCard;