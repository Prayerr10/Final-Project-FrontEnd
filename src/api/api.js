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

export const getPlaylistById = async (id) => {
    try {
        const response = await api.get(`/playlists/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching playlist ${id}:`, error);
        return null;
    }
};

export const updatePlaylist = async (id, updatedData) => {
    try {
        const response = await api.put(`/playlists/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error updating playlist ${id}:`, error);
        return null;
    }
};

export const deletePlaylist = async (id) => {
    try {
        await api.delete(`/playlists/${id}`);
        return true;
    } catch (error) {
        console.error(`Error deleting playlist ${id}:`, error);
        return false;
    }
};

export default api;
