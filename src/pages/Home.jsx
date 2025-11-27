import React, { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { getPlaylists } from '../api/api';
import { FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';

const Home = () => {
    const { allSongs, playSong, playPlaylist, likedSongs, toggleLike } = useContext(PlayerContext);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const data = await getPlaylists();
            setPlaylists(data);
        };
        fetchPlaylists();
    }, []);

    // Get a random color for the gradient based on time or just static for now
    const gradientColor = "from-indigo-900";

    const handlePlayPlaylist = (e, playlistSongs) => {
        e.stopPropagation(); // Prevent bubbling if needed
        playPlaylist(playlistSongs);
    };

    return (
        <div className={`bg-gradient-to-b ${gradientColor} to-zinc-950 min-h-full p-8 -m-8 mb-24`}>
            <div className="mt-8 mb-8">
                <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">Good afternoon</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.slice(0, 6).map((playlist) => (
                        <div
                            key={playlist.id}
                            className="bg-white/10 group rounded-md flex items-center gap-x-4 overflow-hidden hover:bg-white/20 transition cursor-pointer relative shadow-lg backdrop-blur-sm"
                            onClick={() => playPlaylist(playlist.songs)}
                        >
                            <img src={playlist.image} alt={playlist.name} className="w-20 h-20 object-cover shadow-lg" />
                            <div className="font-bold truncate py-5 pr-4 text-white">
                                {playlist.name}
                            </div>
                            <div
                                className="absolute right-4 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition shadow-xl translate-y-2 group-hover:translate-y-0 hover:scale-105 z-10"
                                onClick={(e) => handlePlayPlaylist(e, playlist.songs)}
                            >
                                <FaPlay className="text-black ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-white">Made for you</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {allSongs.map((song) => (
                    <div
                        key={song.id}
                        className="bg-zinc-900/40 p-4 rounded-lg hover:bg-zinc-800/60 transition cursor-pointer group shadow-md hover:shadow-xl backdrop-blur-sm border border-white/5"
                        onClick={() => playSong(song)}
                    >
                        <div className="relative mb-4 w-full aspect-square">
                            <img src={song.image} alt={song.title} className="w-full h-full object-cover rounded-md shadow-lg" />
                            <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition shadow-xl translate-y-2 group-hover:translate-y-0 hover:scale-105">
                                <FaPlay className="text-black ml-1" />
                            </div>
                            <div
                                className="absolute top-2 right-2 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition hover:scale-110 hover:bg-black/70"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLike(song.id);
                                }}
                            >
                                {likedSongs.includes(song.id) ? (
                                    <FaHeart className="text-green-500" size={16} />
                                ) : (
                                    <FaRegHeart className="text-white" size={16} />
                                )}
                            </div>
                        </div>
                        <h3 className="font-bold truncate mb-1 text-white">{song.title}</h3>
                        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
