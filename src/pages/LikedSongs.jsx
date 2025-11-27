import React, { useContext, useState, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { FaPlay, FaClock, FaHeart, FaRandom, FaSort, FaSearch } from 'react-icons/fa';

const LikedSongs = () => {
    const { allSongs, playSong, likedSongs } = useContext(PlayerContext);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [sortType, setSortType] = useState('date'); // 'date', 'title', 'artist'
    const [searchQuery, setSearchQuery] = useState('');
    const [topGenre, setTopGenre] = useState('');

    // Filter songs based on likedSongs IDs
    const likedSongsList = allSongs.filter(song => likedSongs.includes(song.id));

    useEffect(() => {
        let result = [...likedSongsList];

        // Search
        if (searchQuery) {
            result = result.filter(song =>
                song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        if (sortType === 'title') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortType === 'artist') {
            result.sort((a, b) => a.artist.localeCompare(b.artist));
        }
        // 'date' is default (order of addition, effectively reverse of likedSongs list usually, but here just list order)
        // If we want true date added, we'd need to store timestamps. For now, we'll just use the order they appear in the list.

        setFilteredSongs(result);

        // Calculate Top Genre
        if (likedSongsList.length > 0) {
            const genreCounts = {};
            likedSongsList.forEach(song => {
                const genre = song.genre || 'Unknown';
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            });
            const top = Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b);
            setTopGenre(top);
        }
    }, [likedSongs, allSongs, searchQuery, sortType]);

    const handleShufflePlay = () => {
        if (filteredSongs.length > 0) {
            const shuffled = [...filteredSongs].sort(() => Math.random() - 0.5);
            playSong(shuffled[0], shuffled);
        }
    };

    return (
        <div className="-m-8 mb-24">
            {/* Header */}
            <div className="bg-gradient-to-b from-indigo-700 to-indigo-900 p-8 pt-20 flex items-end gap-x-6 shadow-xl relative overflow-hidden">
                {/* Taste Badge */}
                {topGenre && (
                    <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 shadow-lg rotate-3 hover:rotate-0 transition duration-300 cursor-default">
                        <p className="text-xs text-indigo-200 uppercase font-bold mb-1">Your Vibe</p>
                        <p className="text-white font-bold text-lg">You're into <span className="text-indigo-300 capitalize">{topGenre}</span></p>
                    </div>
                )}

                <div className="w-52 h-52 bg-gradient-to-br from-indigo-400 to-purple-300 shadow-2xl flex items-center justify-center rounded-md shrink-0">
                    <FaHeart size={80} className="text-white drop-shadow-lg" />
                </div>
                <div className="flex flex-col gap-y-2 mb-4">
                    <p className="text-sm font-bold uppercase tracking-wider text-white">Playlist</p>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">Liked Songs</h1>
                    <div className="flex items-center gap-x-2 text-sm text-gray-200 font-semibold mt-2">
                        <span>Dave Jordy</span>
                        <span>•</span>
                        <span>{likedSongsList.length} songs</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bg-black/20 backdrop-blur-3xl p-8 min-h-screen">
                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-x-4">
                        <button
                            className="bg-green-500 rounded-full p-4 hover:scale-105 transition shadow-xl hover:bg-green-400 text-black"
                            onClick={() => playSong(filteredSongs[0], filteredSongs)}
                            title="Play All"
                        >
                            <FaPlay size={24} className="ml-1" />
                        </button>
                        <button
                            className="bg-zinc-800 rounded-full p-4 hover:scale-105 transition shadow-xl hover:bg-zinc-700 text-green-500"
                            onClick={handleShufflePlay}
                            title="Shuffle Play"
                        >
                            <FaRandom size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-x-4 w-full md:w-auto">
                        <div className="relative group">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white" />
                            <input
                                type="text"
                                placeholder="Search in liked songs..."
                                className="bg-zinc-800/50 border border-transparent focus:border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 outline-none transition w-full md:w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <select
                                className="bg-zinc-800/50 border border-transparent focus:border-white/20 rounded-md py-2 pl-3 pr-8 text-white outline-none appearance-none cursor-pointer hover:bg-zinc-800 transition"
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                            >
                                <option value="date">Date Added</option>
                                <option value="title">Title</option>
                                <option value="artist">Artist</option>
                            </select>
                            <FaSort className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-2 border-b border-zinc-800 text-gray-400 text-sm font-semibold uppercase sticky top-16 bg-zinc-950/90 z-30">
                        <div>#</div>
                        <div>Title</div>
                        <div>Album</div>
                        <div className="flex justify-end"><FaClock /></div>
                    </div>

                    {filteredSongs.length > 0 ? (
                        filteredSongs.map((song, index) => (
                            <div
                                key={song.id}
                                className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-3 hover:bg-white/10 rounded-md transition cursor-pointer group items-center text-gray-400 hover:text-white"
                                onClick={() => playSong(song, filteredSongs)}
                            >
                                <div className="group-hover:text-white">{index + 1}</div>
                                <div className="flex items-center gap-x-4">
                                    <img src={song.image} alt={song.title} className="w-10 h-10 rounded object-cover" />
                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold text-base">{song.title}</span>
                                        <span className="text-sm group-hover:text-white">{song.artist}</span>
                                    </div>
                                </div>
                                <div className="text-sm">{song.album || "Single"}</div>
                                <div className="flex justify-end text-sm font-variant-numeric tabular-nums">{song.duration}</div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            {searchQuery ? "No songs found matching your search." : "You haven't liked any songs yet."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LikedSongs;
