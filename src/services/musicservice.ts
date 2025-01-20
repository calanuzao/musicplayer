// fetches music data from a public API
import axios from 'axios';
import { Track } from '../types/musictypes';

const API_URL = 'https://api.example.com/search'; // API endpoint

export const searchMusic = async (query: string): Promise<Track[]> => {
    const response = await axios.get(`${API_URL}?q=${encodeURIComponent(query)}`);
    return response.data.tracks; // Adjust based on the actual API response structure
}