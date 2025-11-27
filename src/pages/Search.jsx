import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import songsData from '../data/songs.json';
import { FaPlay, FaPause, FaSearch } from 'react-icons/fa';

const Search = () => {
    const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
    const [query, setQuery] = useState('');

    const filteredSongs = songsData.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );

    const categories = [
        { name: 'Pop', color: 'bg-red-500' },
        { name: 'Indie', color: 'bg-orange-500' },
        { name: 'Hip-Hop', color: 'bg-yellow-600' },
        { name: 'Rock', color: 'bg-green-600' },
        { name: 'Electronic', color: 'bg-teal-600' },
        { name: 'Mood', color: 'bg-blue-600' },
        { name: 'Workout', color: 'bg-indigo-600' },
        { name: 'Chill', color: 'bg-purple-600' },
        { name: 'Focus', color: 'bg-pink-600' },
        { name: 'Sleep', color: 'bg-rose-600' },
    ];

    return (
        <div className="p-8 pb-32">
            <div className="relative mb-8 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-black" />
                </div>
                <input
                    type="text"
                    placeholder="What do you want to listen to?"
                    className="w-full bg-white rounded-full py-3 pl-10 pr-4 text-black font-medium focus:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {query ? (
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
                    <div className="flex flex-col gap-2">
                        {filteredSongs.map((song) => {
                            const isCurrent = currentSong?.id === song.id;
                            return (
                                <div
                                    key={song.id}
                                    className="flex items-center justify-between p-2 rounded hover:bg-[#2a2a2a] cursor-pointer group transition-colors"
                                    onClick={() => isCurrent ? togglePlay() : playSong(song.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-10 h-10">
                                            <img src={song.cover} alt={song.title} className="w-full h-full object-cover rounded" />
                                            {isCurrent && isPlaying && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                    <FaPause className="text-green-500 text-xs" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className={`font-medium ${isCurrent ? 'text-green-500' : 'text-white'}`}>{song.title}</div>
                                            <div className="text-sm text-gray-400">{song.artist}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {song.duration}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Browse all</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {categories.map((cat, i) => (
                            <div
                                key={i}
                                className={`${cat.color} aspect-square rounded-lg p-4 relative overflow-hidden cursor-pointer hover:opacity-90 transition`}
                            >
                                <h3 className="text-2xl font-bold text-white">{cat.name}</h3>
                                <div className="absolute -bottom-2 -right-4 w-24 h-24 bg-black/20 rotate-[25deg] rounded-md"></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
