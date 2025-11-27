import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import songsData from '../data/songs.json';
import { FaMusic, FaHeart, FaPlay, FaPause } from 'react-icons/fa';

const Library = () => {
    const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
    const [activeTab, setActiveTab] = useState('playlists');

    return (
        <div className="p-8 pb-32">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('playlists')}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition ${activeTab === 'playlists' ? 'bg-white text-black' : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'}`}
                >
                    Playlists
                </button>
                <button
                    onClick={() => setActiveTab('liked')}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition ${activeTab === 'liked' ? 'bg-white text-black' : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'}`}
                >
                    Liked Songs
                </button>
            </div>

            {activeTab === 'playlists' && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <div className="col-span-2 bg-gradient-to-br from-indigo-700 to-indigo-400 p-6 rounded-lg relative group cursor-pointer h-64 flex flex-col justify-end">
                        <h2 className="text-3xl font-bold text-white mb-2">Liked Songs</h2>
                        <p className="text-white font-medium">142 liked songs</p>
                        <div className="absolute bottom-4 right-4 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105">
                            <FaPlay className="text-black ml-1" />
                        </div>
                    </div>

                    {/* Dummy Playlists */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition cursor-pointer group">
                            <div className="bg-[#333] w-full aspect-square rounded-md mb-4 flex items-center justify-center shadow-lg">
                                <FaMusic className="text-4xl text-gray-500" />
                            </div>
                            <h3 className="font-bold text-white mb-1">My Playlist #{i}</h3>
                            <p className="text-sm text-gray-400">By You</p>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'liked' && (
                <div className="flex flex-col gap-2">
                    {songsData.map((song) => {
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
                                <div className="flex items-center gap-4">
                                    <FaHeart className="text-green-500" />
                                    <span className="text-sm text-gray-400">{song.duration}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Library;
