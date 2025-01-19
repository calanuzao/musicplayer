// showcases more information and play audio previews
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import { Track } from '../types/MusicTypes';

const DetailsScreen = ({ route }) => {
    const { track } = route.params;

    const playPreview = () => {
        const sound = new Sound(track.previewUrl, null, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            sound.play();
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.trackName}>{track.name}</Text>
            <Text style={styles.artistName}>{track.artist}</Text>
            <Button title="Play Preview" onPress={playPreview} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    trackName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    artistName: {
        fontSize: 18,
        color: 'gray',
    },
});

export default DetailsScreen;