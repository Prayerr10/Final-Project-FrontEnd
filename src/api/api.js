import axios from 'axios';

// Setup axios instance dengan baseURL
const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Get all songs from the database
 * @returns {Promise} Array of songs
 */
export const getAllSongs = async () => {
    try {
        const response = await api.get('/songs');
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
};

/**
 * Create a new song
 * @param {Object} data - Song data to create
 * @returns {Promise} Created song object
 */
export const createSong = async (data) => {
    try {
        const response = await api.post('/songs', data);
        return response.data;
    } catch (error) {
        console.error('Error creating song:', error);
        throw error;
    }
};

/**
 * Delete a song by ID
 * @param {string} id - Song ID to delete
 * @returns {Promise} Deleted song object
 */
export const deleteSong = async (id) => {
    try {
        const response = await api.delete(`/songs/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting song:', error);
        throw error;
    }
};

/**
 * Search songs by query (title or artist)
 * @param {string} query - Search query
 * @returns {Promise} Filtered array of songs
 */
export const searchSongs = async (query) => {
    try {
        const response = await api.get('/songs');
        const songs = response.data;

        if (!query || query.trim() === '') {
            return songs;
        }

        const filtered = songs.filter((song) => {
            const searchTerm = query.toLowerCase();
            return (
                song.title.toLowerCase().includes(searchTerm) ||
                song.artist.toLowerCase().includes(searchTerm)
            );
        });

        return filtered;
    } catch (error) {
        console.error('Error searching songs:', error);
        throw error;
    }
};

export default api;
