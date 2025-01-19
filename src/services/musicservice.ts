// fetches music data from a public API
import axios from 'axios';
import { Track } from '../types/musictypes';

const API_URL = 'https://apihere' // add api

export const searchMusic = async (query: string): Promise<Track[]> => {
    const response = await axios.get(`${API_URL}?q={query}`);
    return response.data.tracks; // adjust/review api response structure 
}