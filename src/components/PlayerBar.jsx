import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from 'react-icons/fa';

const PlayerBar = () => {
    const {
        currentSong,
        isPlaying,
        pauseSong,
        resumeSong,
        nextSong,
        prevSong,
        currentTime,
        duration,
        seek
    } = useContext(PlayerContext);

    if (!currentSong) return null;

    const formatTime = (time) => {
        if (!time) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSeek = (e) => {
        seek(Number(e.target.value));
    };

    return (
        <div className="fixed bottom-0 w-full h-24 bg-black/90 backdrop-blur-lg border-t border-zinc-800 px-4 flex items-center justify-between text-white z-50">
            {/* Song Info */}
            <div className="flex items-center gap-x-4 w-[30%]">
                <img src={currentSong.image} alt={currentSong.title} className="w-14 h-14 rounded object-cover shadow-lg" />
                <div className="flex flex-col">
                    <p className="text-sm font-semibold hover:underline cursor-pointer text-white">{currentSong.title}</p>
                    <p className="text-xs text-gray-400 hover:underline cursor-pointer">{currentSong.artist}</p>
                </div>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center w-[40%] gap-y-2">
                <div className="flex items-center gap-x-6">
                    <FaStepBackward
                        className="text-gray-400 hover:text-white cursor-pointer transition active:scale-90"
                        size={20}
                        onClick={prevSong}
                    />
                    <div
                        className="bg-white rounded-full p-2 text-black hover:scale-105 transition cursor-pointer active:scale-95 shadow-md shadow-white/20"
                        onClick={isPlaying ? pauseSong : resumeSong}
                    >
                        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} className="ml-0.5" />}
                    </div>
                    <FaStepForward
                        className="text-gray-400 hover:text-white cursor-pointer transition active:scale-90"
                        size={20}
                        onClick={nextSong}
                    />
                </div>

                <div className="flex items-center gap-x-2 w-full max-w-md">
                    <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-white hover:accent-green-500"
                    />
                    <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume / Extra */}
            <div className="w-[30%] flex justify-end items-center gap-x-2 pr-4">
                <FaVolumeUp className="text-gray-400" size={18} />
                <div className="w-24 h-1 bg-zinc-600 rounded-full">
                    <div className="h-full bg-white w-2/3 rounded-full hover:bg-green-500 transition"></div>
                </div>
            </div>
        </div>
    );
};

export default PlayerBar;
