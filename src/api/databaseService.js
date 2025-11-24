// src/api/databaseService.js
import axios from 'axios';
const API_URL = 'http://localhost:3000';

// 👇 PERBAIKAN: "Libary" menjadi "Library"
export const addSongToLibrary = async (songData) => {
    try {
        const checkRes = await axios.get(`${API_URL}/songs?youtubeId=${songData.youtubeId}`);
        if (checkRes.data.length > 0) {
            throw new Error("Lagu ini sudah ada di Library!");
        }

        const payLoad = {
            id: Date.now().toString(),
            title: songData.title,
            artist: songData.artist,
            youtubeId: songData.youtubeId,
            coverUrl: songData.coverUrl,
            duration: songData.duration,
            downloadUrl: songData.downloadUrl,
            addedAt: new Date().toISOString()
        };

        const response = await axios.post(`${API_URL}/songs`, payLoad);
        return response.data;
    } catch (error) {
        throw error;
    }
};