import React, { useContext, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { FaPlay, FaSearch } from 'react-icons/fa';

const Search = () => {
    const { allSongs, playSong } = useContext(PlayerContext);
    const [query, setQuery] = useState('');

    const filteredSongs = allSongs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="pt-4">
            <div className="relative mb-10 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-900" />
                </div>
                <input
                    type="text"
                    placeholder="What do you want to listen to?"
                    className="w-full bg-white rounded-full py-3 pl-12 pr-5 text-black font-semibold focus:outline-none focus:ring-4 focus:ring-white/30 transition shadow-lg"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {query ? (
                <>
                    <h2 className="text-2xl font-bold mb-6 text-white">Top result</h2>
                    <div className="flex flex-col gap-y-8">
                        {filteredSongs.length > 0 && (
                            <div
                                className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition cursor-pointer group max-w-md shadow-xl relative"
                                onClick={() => playSong(filteredSongs[0])}
                            >
                                <img src={filteredSongs[0].image} alt={filteredSongs[0].title} className="w-24 h-24 rounded-md shadow-lg mb-4" />
                                <h3 className="text-3xl font-bold text-white mb-2">{filteredSongs[0].title}</h3>
                                <div className="flex items-center gap-x-2">
                                    <span className="text-gray-400 text-sm font-bold bg-zinc-800 px-3 py-1 rounded-full">Song</span>
                                    <span className="text-white font-semibold">{filteredSongs[0].artist}</span>
                                </div>
                                <div className="absolute right-6 bottom-6 bg-green-500 rounded-full p-4 opacity-0 group-hover:opacity-100 transition shadow-xl translate-y-2 group-hover:translate-y-0 hover:scale-105">
                                    <FaPlay className="text-black ml-1" size={20} />
                                </div>
                            </div>
                        )}

                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-white">Songs</h2>
                            <div className="flex flex-col gap-y-2">
                                {filteredSongs.map((song) => (
                                    <div
                                        key={song.id}
                                        className="flex items-center justify-between p-2 rounded-md hover:bg-white/10 transition cursor-pointer group"
                                        onClick={() => playSong(song)}
                                    >
                                        <div className="flex items-center gap-x-4">
                                            <img src={song.image} alt={song.title} className="w-10 h-10 rounded object-cover" />
                                            <div className="flex flex-col">
                                                <span className="text-white font-semibold">{song.title}</span>
                                                <span className="text-sm text-gray-400 group-hover:text-white">{song.artist}</span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-400">{song.duration}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-white">Browse all</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {/* Categories Mockup */}
                        {['Pop', 'Indie', 'Hip-Hop', 'Rock', 'Electronic', 'Mood', 'Workout', 'Chill', 'Focus', 'Sleep'].map((genre, i) => (
                            <div
                                key={i}
                                className="aspect-square rounded-lg p-4 font-bold text-2xl text-white relative overflow-hidden cursor-pointer hover:scale-105 transition shadow-lg"
                                style={{ backgroundColor: `hsl(${i * 36}, 70%, 50%)` }}
                            >
                                {genre}
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
