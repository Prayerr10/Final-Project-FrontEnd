import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaylistById, getSongs, updatePlaylist, deletePlaylist } from '../api/api';
import { PlayerContext } from '../context/PlayerContext';
import { FaPlay, FaTrash, FaPlus, FaMusic, FaArrowLeft } from 'react-icons/fa';

const PlaylistDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { playPlaylist, allSongs } = useContext(PlayerContext);
    const [playlist, setPlaylist] = useState(null);
    const [availableSongs, setAvailableSongs] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const playlistData = await getPlaylistById(id);
            if (playlistData) {
                setPlaylist(playlistData);
            }
            // We can use allSongs from context, but let's fetch fresh to be sure or just use context
            // Using context is better for consistency if it's already loaded
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (playlist && allSongs.length > 0) {
            const playlistSongIds = playlist.songs || [];
            const available = allSongs.filter(song => !playlistSongIds.includes(song.id));
            setAvailableSongs(available);
        }
    }, [playlist, allSongs]);

    const handlePlay = () => {
        if (playlist && playlist.songs && playlist.songs.length > 0) {
            playPlaylist(playlist.songs);
        }
    };

    const handleRemoveSong = async (songId) => {
        const updatedSongs = playlist.songs.filter(id => id !== songId);
        const updatedPlaylist = { ...playlist, songs: updatedSongs };

        const result = await updatePlaylist(playlist.id, updatedPlaylist);
        if (result) {
            setPlaylist(result);
        }
    };

    const handleAddSong = async (songId) => {
        const updatedSongs = [...(playlist.songs || []), songId];
        const updatedPlaylist = { ...playlist, songs: updatedSongs };

        const result = await updatePlaylist(playlist.id, updatedPlaylist);
        if (result) {
            setPlaylist(result);
            setIsAdding(false);
        }
    };

    const handleDeletePlaylist = async () => {
        if (window.confirm("Are you sure you want to delete this playlist?")) {
            const success = await deletePlaylist(playlist.id);
            if (success) {
                navigate('/library');
            }
        }
    };

    if (!playlist) return <div className="text-white p-8">Loading...</div>;

    const playlistSongsObjects = (playlist.songs || []).map(songId =>
        allSongs.find(s => s.id === songId)
    ).filter(Boolean);

    return (
        <div className="pt-4 pb-24 px-8 bg-gradient-to-b from-zinc-800 to-black min-h-full -m-8">
            <button onClick={() => navigate(-1)} className="mb-6 text-white/70 hover:text-white flex items-center gap-2">
                <FaArrowLeft /> Back
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-end mb-8">
                <div className="w-52 h-52 shadow-2xl shrink-0">
                    {playlist.image ? (
                        <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover rounded" />
                    ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center rounded">
                            <FaMusic size={60} className="text-zinc-600" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold uppercase text-white">Playlist</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{playlist.name}</h1>
                    <p className="text-white/70">{playlist.description}</p>
                    <p className="text-white font-bold text-sm">
                        Dave Jordy • {playlistSongsObjects.length} songs
                    </p>
                </div>
            </div>

            <div className="mb-8 flex items-center gap-4">
                <button
                    onClick={handlePlay}
                    className="bg-green-500 rounded-full p-4 hover:scale-105 transition shadow-lg text-black"
                >
                    <FaPlay size={24} className="ml-1" />
                </button>
                <button
                    onClick={handleDeletePlaylist}
                    className="text-white/50 hover:text-white font-bold text-sm uppercase tracking-wider border border-white/20 hover:border-white px-4 py-2 rounded-full transition"
                >
                    Delete Playlist
                </button>
            </div>

            <div className="flex flex-col gap-2 mb-12">
                {playlistSongsObjects.map((song, index) => (
                    <div key={`${song.id}-${index}`} className="flex items-center justify-between p-3 rounded-md hover:bg-white/10 group transition">
                        <div className="flex items-center gap-4">
                            <span className="text-white/50 w-6 text-center">{index + 1}</span>
                            <img src={song.image} alt={song.title} className="w-10 h-10 rounded object-cover" />
                            <div>
                                <p className="text-white font-semibold hover:underline cursor-pointer">{song.title}</p>
                                <p className="text-sm text-white/70 hover:underline cursor-pointer">{song.artist}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleRemoveSong(song.id)}
                            className="text-white/30 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                            title="Remove from playlist"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
                {playlistSongsObjects.length === 0 && (
                    <div className="text-white/50 text-center py-8">
                        No songs in this playlist yet.
                    </div>
                )}
            </div>

            <div className="border-t border-white/10 pt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Recommended Songs</h2>
                <p className="text-white/70 mb-6">Add songs to your playlist</p>

                <div className="flex flex-col gap-2">
                    {availableSongs.map((song) => (
                        <div key={song.id} className="flex items-center justify-between p-3 rounded-md hover:bg-white/10 group transition">
                            <div className="flex items-center gap-4">
                                <img src={song.image} alt={song.title} className="w-10 h-10 rounded object-cover" />
                                <div>
                                    <p className="text-white font-semibold">{song.title}</p>
                                    <p className="text-sm text-white/70">{song.artist}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAddSong(song.id)}
                                className="border border-white/30 rounded-full px-4 py-1 text-sm text-white font-bold hover:border-white hover:scale-105 transition"
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistDetails;
