import React, { useEffect, useState, useContext } from 'react';
import { getPlaylists } from '../api/api';
import { PlayerContext } from '../context/PlayerContext';
import { FaMusic, FaPlay } from 'react-icons/fa';

const Library = () => {
    const [playlists, setPlaylists] = useState([]);
    const { playPlaylist } = useContext(PlayerContext);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const data = await getPlaylists();
            setPlaylists(data);
        };
        fetchPlaylists();
    }, []);

    return (
        <div className="pt-4">
            <h1 className="text-3xl font-bold mb-6 text-white">Your Library</h1>

            <div className="flex gap-x-4 mb-8">
                <button className="bg-zinc-800 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-700 transition">Playlists</button>
                <button className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-800 transition">Artists</button>
                <button className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-800 transition">Albums</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {/* Liked Songs Card */}
                <div className="col-span-2 bg-gradient-to-br from-indigo-800 to-indigo-500 p-6 rounded-lg cursor-pointer hover:scale-[1.02] transition shadow-lg group relative flex flex-col justify-end h-64">
                    <div className="absolute top-6 left-6">
                        {/* Some mocked content lines */}
                        <span className="text-white/70 font-bold text-sm">Playlist</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Liked Songs</h2>
                    <p className="text-white/80 font-semibold">8 liked songs</p>
                    <div className="absolute right-6 bottom-6 bg-green-500 rounded-full p-4 opacity-0 group-hover:opacity-100 transition shadow-xl translate-y-2 group-hover:translate-y-0 hover:scale-105">
                        <FaPlay className="text-black ml-1" size={20} />
                    </div>
                </div>

                {playlists.map((playlist) => (
                    <div
                        key={playlist.id}
                        className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition cursor-pointer group shadow-md"
                        onClick={() => playPlaylist(playlist.songs)}
                    >
                        <div className="relative mb-4 aspect-square">
                            {playlist.image ? (
                                <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover rounded-md shadow-lg" />
                            ) : (
                                <div className="w-full h-full bg-zinc-800 rounded-md flex items-center justify-center">
                                    <FaMusic size={40} className="text-zinc-600" />
                                </div>
                            )}
                            <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition shadow-xl translate-y-2 group-hover:translate-y-0 hover:scale-105">
                                <FaPlay className="text-black ml-1" />
                            </div>
                        </div>
                        <h3 className="font-bold truncate mb-1 text-white">{playlist.name}</h3>
                        <p className="text-sm text-gray-400 truncate">By Dave Jordy</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
