// showcases more information and play audio previews
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Sound from 'react-native-sound';
import { RootStackScreenProps } from '../navigation/types';
import { toggleFavorite, isFavorite } from '../services/favoritesService';

const DetailsScreen: React.FC<RootStackScreenProps<'Details'>> = ({ route }) => {
    const { track } = route.params;
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState<Sound | null>(null);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        // Check if track is favorited on mount
        const checkFavorite = async () => {
            const favorited = await isFavorite(track.id);
            setIsFavorited(favorited);
        };
        checkFavorite();
    }, [track.id]);

    const handlePlayPreview = () => {
        if (isPlaying && sound) {
            sound.stop();
            sound.release();
            setSound(null);
            setIsPlaying(false);
            return;
        }

        if (track.previewUrl) {
            const newSound = new Sound(track.previewUrl, '', (error) => {
                if (error) {
                    console.log('Failed to load sound', error);
                    return;
                }

                setSound(newSound);
                newSound.play((success) => {
                    if (success) {
                        console.log('Successfully finished playing');
                    } else {
                        console.log('Playback failed due to audio decoding errors');
                    }
                    setIsPlaying(false);
                    newSound.release();
                });
            });

            setIsPlaying(true);
        }
    };

    const handleToggleFavorite = async () => {
        const result = await toggleFavorite(track);
        setIsFavorited(result);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: track.albumArt }} style={styles.albumArt} />
            
            <View style={styles.infoContainer}>
                <Text style={styles.trackName}>{track.name}</Text>
                <Text style={styles.artistName}>{track.artist}</Text>
                <Text style={styles.albumName}>{track.album}</Text>

                <View style={styles.buttonContainer}>
                    {track.previewUrl && track.previewUrl.length > 0 && (
                        <TouchableOpacity
                            style={[styles.playButton, isPlaying && styles.buttonPlaying]}
                            onPress={handlePlayPreview}
                        >
                            <Text style={styles.playButtonText}>
                                {isPlaying ? '⏹️ Stop' : '▶️ Play Preview'}
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[styles.favoriteButton, isFavorited && styles.buttonFavorited]}
                        onPress={handleToggleFavorite}
                    >
                        <Text style={styles.buttonText}>
                            {isFavorited ? '❤️ Favorited' : '🤍 Add to Favorites'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    albumArt: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
        marginBottom: 16,
    },
    infoContainer: {
        flex: 1,
    },
    trackName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
    },
    artistName: {
        fontSize: 18,
        color: '#666',
        marginBottom: 4,
    },
    albumName: {
        fontSize: 16,
        color: '#888',
        marginBottom: 24,
    },
    buttonContainer: {
        gap: 12,
    },
    playButton: {
        backgroundColor: '#1DB954',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    favoriteButton: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonPlaying: {
        backgroundColor: '#E74C3C',
    },
    buttonFavorited: {
        backgroundColor: '#FFE4E1',
        borderColor: '#E74C3C',
    },
    playButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 16,
        color: '#666',
    },
});

export default DetailsScreen;