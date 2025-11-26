import React, { createContext, useState, useRef, useEffect } from 'react';
import { getSongs } from '../api/api';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [allSongs, setAllSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [queue, setQueue] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchSongsData = async () => {
            const data = await getSongs();
            setAllSongs(data);
        };
        fetchSongsData();
    }, []);

    const playSong = (song, newQueue = null) => {
        if (newQueue) {
            setQueue(newQueue);
        } else if (queue.length === 0) {
            // If no queue exists, make a queue with just this song or all songs?
            // Let's default to all songs if no queue is specified, starting from this song
            setQueue(allSongs);
        }

        setCurrentSong(song);
        setIsPlaying(true);

        if (audioRef.current) {
            audioRef.current.src = song.url;
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.error("Playback failed:", e));
        }
    };

    const playPlaylist = (playlistSongsIds) => {
        const playlistSongs = playlistSongsIds.map(id => allSongs.find(s => s.id === id)).filter(Boolean);
        if (playlistSongs.length > 0) {
            setQueue(playlistSongs);
            playSong(playlistSongs[0], playlistSongs);
        }
    };

    const pauseSong = () => {
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const resumeSong = () => {
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.error("Playback failed:", e));
        }
    };

    const nextSong = () => {
        if (!currentSong || queue.length === 0) return;
        const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % queue.length;
        playSong(queue[nextIndex]);
    };

    const prevSong = () => {
        if (!currentSong || queue.length === 0) return;
        const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
        playSong(queue[prevIndex]);
    };

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };

    const onEnded = () => {
        nextSong();
    };

    const seek = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    return (
        <PlayerContext.Provider
            value={{
                allSongs,
                currentSong,
                isPlaying,
                queue,
                currentTime,
                duration,
                playSong,
                playPlaylist,
                pauseSong,
                resumeSong,
                nextSong,
                prevSong,
                seek,
                audioRef,
            }}
        >
            <audio
                ref={audioRef}
                onEnded={onEnded}
                onTimeUpdate={onTimeUpdate}
            />
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerProvider;
