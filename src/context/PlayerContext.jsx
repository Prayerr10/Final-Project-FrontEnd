import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import songsData from '../data/songs.json';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState({ current: 0, duration: 0 });
    const audioRef = useRef(new Audio());

    const playSong = (songId) => {
        const song = songsData.find(s => s.id === songId);
        if (song) {
            if (currentSong?.id === song.id) {
                togglePlay();
            } else {
                setCurrentSong(song);
                setIsPlaying(true);
                audioRef.current.src = song.url;
                audioRef.current.play().catch(e => console.error("Error playing:", e));
            }
        }
    };

    const togglePlay = () => {
        if (currentSong) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().catch(e => console.error("Error playing:", e));
                setIsPlaying(true);
            }
        }
    };

    const seek = (amount) => {
        if (audioRef.current) {
            audioRef.current.currentTime = amount;
        }
    };

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => {
            setTime({
                current: audio.currentTime,
                duration: audio.duration || 0
            });
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setTime({ current: 0, duration: 0 });
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateTime);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateTime);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    return (
        <PlayerContext.Provider value={{ currentSong, isPlaying, playSong, togglePlay, time, seek }}>
            {children}
        </PlayerContext.Provider>
    );
};
