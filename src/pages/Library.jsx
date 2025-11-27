import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlaylists } from '../api/api';
import { PlayerContext } from '../context/PlayerContext';
import { FaMusic, FaPlay } from 'react-icons/fa';

const Library = () => {
    const [playlists, setPlaylists] = useState([]);
    const { playPlaylist, likedSongs, allSongs, playSong } = useContext(PlayerContext);
    const [view, setView] = useState('playlists'); // 'playlists', 'artists', 'albums'
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylists = async () => {
            const data = await getPlaylists();
            setPlaylists(data);
        };
        fetchPlaylists();
    }, []);

    const handlePlayLikedSongs = (e) => {
        e.stopPropagation();
        const likedSongsList = allSongs.filter(song => likedSongs.includes(song.id));
        if (likedSongsList.length > 0) {
            playPlaylist(likedSongsList.map(s => s.id));
        }
    };

    const getUniqueArtists = () => {
        const artists = allSongs.map(song => song.artist);
        return [...new Set(artists)];
    };

    // Since we don't have explicit albums, we'll group by artist as a proxy or just show songs
    // For now, let's just show songs as "Albums" or maybe just a placeholder
    // Actually, let's just list all songs for "Albums" view for now, or maybe group by genre?
    // Let's just list unique artists for Artists view.
    // For Albums, let's just show a message or maybe list songs.
    // Let's list songs for Albums view for now.

    return (
        <div className="pt-4">
            <h1 className="text-3xl font-bold mb-6 text-white">Your Library</h1>

            <div className="flex gap-x-4 mb-8">
                <button
                    className={`px-4 py-2 rounded-full text-sm font-bold transition ${view === 'playlists' ? 'bg-white text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
                    onClick={() => setView('playlists')}
                >
                    Playlists
                </button>
                <button
                    className={`px-4 py-2 rounded-full text-sm font-bold transition ${view === 'artists' ? 'bg-white text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
                    onClick={() => setView('artists')}
                >
                    Artists
                </button>
                <button
                    className={`px-4 py-2 rounded-full text-sm font-bold transition ${view === 'albums' ? 'bg-white text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
                    onClick={() => setView('albums')}
                >
                    Albums
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {/* Liked Songs Card - Only show in Playlists view */}
                {view === 'playlists' && (
                    <div
                        className="col-span-2 bg-gradient-to-br from-indigo-800 to-indigo-500 p-6 rounded-lg cursor-pointer hover:scale-[1.02] transition shadow-lg group relative flex flex-col justify-end h-64"
                        onClick={handlePlayLikedSongs}
                    >
                        <div className="absolute top-6 left-6">
                            <span className="text-white/70 font-bold text-sm">Playlist</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Liked Songs</h2>
                        <p className="text-white/80 font-semibold">{likedSongs.length} liked songs</p>
                        <div className="absolute right-6 bottom-6 bg-green-500 rounded-full p-4 opacity-0 group-hover:opacity-100 transition shadow-xl translate-y-2 group-hover:translate-y-0 hover:scale-105">
                            <FaPlay className="text-black ml-1" size={20} />
                        </div>
                    </div>
                )}

                {view === 'playlists' && playlists.map((playlist) => (
                    <div
                        key={playlist.id}
                        className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition cursor-pointer group shadow-md"
                        onClick={() => navigate(`/playlist/${playlist.id}`)}
                    >
                        <div className="relative mb-4 aspect-square">
                            {playlist.image ? (
                                <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover rounded-md shadow-lg" />
                            ) : (
                                <div className="w-full h-full bg-zinc-800 rounded-md flex items-center justify-center">
                                    <FaMusic size={40} className="text-zinc-600" />
                                </div>
                            )}
                            <div
                                className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition shadow-xl translate-y-2 group-hover:translate-y-0 hover:scale-105"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playPlaylist(playlist.songs);
                                }}
                            >
                                <FaPlay className="text-black ml-1" />
                            </div>
                        </div>
                        <h3 className="font-bold truncate mb-1 text-white">{playlist.name}</h3>
                        <p className="text-sm text-gray-400 truncate">By Dave Jordy</p>
                    </div>
                ))}

                {view === 'artists' && getUniqueArtists().map((artist, index) => (
                    <div
                        key={index}
                        className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition cursor-pointer group shadow-md"
                    >
                        <div className="relative mb-4 aspect-square">
                            <div className="w-full h-full bg-zinc-800 rounded-full flex items-center justify-center shadow-lg">
                                <FaMusic size={40} className="text-zinc-600" />
                            </div>
                        </div>
                        <h3 className="font-bold truncate mb-1 text-white text-center">{artist}</h3>
                        <p className="text-sm text-gray-400 truncate text-center">Artist</p>
                    </div>
                ))}

                {view === 'albums' && allSongs.map((song) => (
                    <div
                        key={song.id}
                        className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition cursor-pointer group shadow-md"
                        onClick={() => playSong(song)}
                    >
                        <div className="relative mb-4 aspect-square">
                            <img src={song.image} alt={song.title} className="w-full h-full object-cover rounded-md shadow-lg" />
                            <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition shadow-xl translate-y-2 group-hover:translate-y-0 hover:scale-105">
                                <FaPlay className="text-black ml-1" />
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

export default Library;
