import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getSongs = async () => {
    try {
        const response = await api.get('/songs');
        return response.data;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
};

export const getPlaylists = async () => {
    try {
        const response = await api.get('/playlists');
        return response.data;
    } catch (error) {
        console.error("Error fetching playlists:", error);
        return [];
    }
};

export default api;
