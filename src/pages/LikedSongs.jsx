import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { FaPlay, FaClock, FaHeart } from 'react-icons/fa';

const LikedSongs = () => {
    const { allSongs, playSong } = useContext(PlayerContext);

    return (
        <div className="-m-8 mb-24">
            {/* Header */}
            <div className="bg-gradient-to-b from-indigo-700 to-indigo-900 p-8 pt-20 flex items-end gap-x-6 shadow-xl">
                <div className="w-52 h-52 bg-gradient-to-br from-indigo-400 to-purple-300 shadow-2xl flex items-center justify-center rounded-md">
                    <FaHeart size={80} className="text-white drop-shadow-lg" />
                </div>
                <div className="flex flex-col gap-y-2 mb-4">
                    <p className="text-sm font-bold uppercase tracking-wider text-white">Playlist</p>
                    <h1 className="text-7xl font-extrabold text-white drop-shadow-lg">Liked Songs</h1>
                    <div className="flex items-center gap-x-2 text-sm text-gray-200 font-semibold mt-2">
                        <span>Dave Jordy</span>
                        <span>•</span>
                        <span>{allSongs.length} songs</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bg-black/20 backdrop-blur-3xl p-8 min-h-screen">
                <div className="flex items-center gap-x-6 mb-8">
                    <button
                        className="bg-green-500 rounded-full p-4 hover:scale-105 transition shadow-xl hover:bg-green-400"
                        onClick={() => playSong(allSongs[0], allSongs)}
                    >
                        <FaPlay className="text-black ml-1" size={24} />
                    </button>
                </div>

                <div className="flex flex-col">
                    <div className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-2 border-b border-zinc-800 text-gray-400 text-sm font-semibold uppercase sticky top-16 bg-zinc-950/90 z-30">
                        <div>#</div>
                        <div>Title</div>
                        <div>Album</div>
                        <div className="flex justify-end"><FaClock /></div>
                    </div>

                    {allSongs.map((song, index) => (
                        <div
                            key={song.id}
                            className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-3 hover:bg-white/10 rounded-md transition cursor-pointer group items-center text-gray-400 hover:text-white"
                            onClick={() => playSong(song, allSongs)}
                        >
                            <div className="group-hover:text-white">{index + 1}</div>
                            <div className="flex items-center gap-x-4">
                                <img src={song.image} alt={song.title} className="w-10 h-10 rounded object-cover" />
                                <div className="flex flex-col">
                                    <span className="text-white font-semibold text-base">{song.title}</span>
                                    <span className="text-sm group-hover:text-white">{song.artist}</span>
                                </div>
                            </div>
                            <div className="text-sm">{song.album}</div>
                            <div className="flex justify-end text-sm font-variant-numeric tabular-nums">{song.duration}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LikedSongs;
