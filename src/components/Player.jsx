import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo, FaMusic } from 'react-icons/fa';
import { MdLyrics } from 'react-icons/md';
import { IoVolumeMedium } from 'react-icons/io5';

const Player = () => {
    const { currentSong, isPlaying, togglePlay, time, seek } = usePlayer();
    const [showLyrics, setShowLyrics] = useState(false);
    const [coverError, setCoverError] = useState(false);

    if (!currentSong) return null;

    const formatTime = (seconds) => {
        if (!seconds) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSeek = (e) => {
        const newTime = (e.target.value / 100) * time.duration;
        seek(newTime);
    };

    const progressPercent = time.duration ? (time.current / time.duration) * 100 : 0;

    return (
        <>
            {/* Player Bar */}
            <div className="h-full w-full bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 flex items-center justify-between relative z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">

                {/* Left: Song Info */}
                <div className="flex items-center w-[30%] min-w-[180px]">
                    <div className="relative group cursor-pointer">
                        {/* Spinning Vinyl Effect */}
                        <div className={`relative w-14 h-14 rounded-full overflow-hidden shadow-lg border-2 border-gray-800 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                            {!coverError ? (
                                <>
                                    <img
                                        src={currentSong.cover}
                                        alt={currentSong.title}
                                        onError={() => setCoverError(true)}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                                </>
                            ) : (
                                <div
                                    className="w-full h-full flex items-center justify-center"
                                    style={{ background: `linear-gradient(135deg, ${currentSong.color}dd 0%, ${currentSong.color}55 100%)` }}
                                >
                                    <FaMusic className="text-white text-xl" />
                                </div>
                            )}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border border-gray-700"></div>
                        </div>
                    </div>
                    <div className="ml-4 overflow-hidden">
                        <h4 className="text-white font-bold text-sm truncate hover:underline cursor-pointer tracking-wide">
                            {currentSong.title}
                        </h4>
                        <p className="text-gray-400 text-xs hover:text-white hover:underline cursor-pointer transition-colors font-medium">
                            {currentSong.artist}
                        </p>
                    </div>
                </div>

                {/* Center: Controls */}
                <div className="flex flex-col items-center w-[40%] max-w-[722px]">
                    <div className="flex items-center space-x-6 mb-2">
                        <button className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95 text-lg">
                            <FaRandom />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95 text-xl">
                            <FaStepBackward />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/20"
                        >
                            {isPlaying ? <FaPause className="text-black text-sm" /> : <FaPlay className="text-black text-sm ml-0.5" />}
                        </button>

                        <button className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95 text-xl">
                            <FaStepForward />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-all hover:scale-110 active:scale-95 text-lg">
                            <FaRedo />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full flex items-center space-x-2 text-xs text-gray-400 font-medium font-mono">
                        <span className="w-10 text-right">{formatTime(time.current)}</span>
                        <div className="h-1 flex-1 bg-white/10 rounded-full relative group cursor-pointer overflow-visible">
                            <div className="absolute inset-0 rounded-full"></div>
                            <div
                                className="absolute top-0 left-0 h-full bg-white group-hover:bg-green-500 rounded-full transition-colors duration-200"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md transition-opacity duration-200 pointer-events-none"
                                style={{ left: `${progressPercent}%` }}
                            ></div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progressPercent || 0}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                        </div>
                        <span className="w-10">{formatTime(time.duration)}</span>
                    </div>
                </div>

                {/* Right: Extra Controls & Lyrics Button */}
                <div className="flex items-center justify-end w-[30%] min-w-[180px] space-x-4">

                    {/* LYRICS BUTTON */}
                    <button
                        onClick={() => setShowLyrics(!showLyrics)}
                        className={`
              p-2 rounded-lg transition-all duration-300 relative group
              ${showLyrics ? 'text-green-400 bg-green-500/10 shadow-[0_0_15px_rgba(74,222,128,0.2)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}
            `}
                        title="Lyrics"
                    >
                        <MdLyrics className={`text-xl ${isPlaying && showLyrics ? 'animate-pulse' : ''}`} />
                        {showLyrics && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full shadow-lg animate-ping"></span>
                        )}
                    </button>

                    <div className="flex items-center space-x-2 w-24 group">
                        <IoVolumeMedium className="text-gray-400 text-xl group-hover:text-white transition-colors" />
                        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-gray-400 group-hover:bg-green-500 rounded-full transition-colors"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LYRICS OVERLAY */}
            {showLyrics && (
                <div className="fixed bottom-[90px] right-0 w-[400px] max-w-[90vw] h-[calc(100vh-180px)] bg-black/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-40 overflow-hidden flex flex-col animate-slide-up">
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-b from-gray-900/80 to-transparent z-10 border-b border-white/5 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-black text-white mb-1 tracking-tight">Lyrics</h3>
                            <p className="text-gray-400 text-sm font-medium">
                                From <span className="text-white">{currentSong.title}</span>
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                            <MdLyrics className="text-green-500 text-xl" />
                        </div>
                    </div>

                    {/* Lyrics Content */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                        {currentSong.lyrics ? (
                            currentSong.lyrics.split('\n\n').map((verse, i) => (
                                <p key={i} className="text-2xl font-bold text-gray-400 leading-relaxed hover:text-white transition-colors cursor-default tracking-wide">
                                    {verse.split('\n').map((line, j) => (
                                        <span key={j} className="block mb-2">{line}</span>
                                    ))}
                                </p>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <MdLyrics className="text-6xl mb-4 opacity-20" />
                                <p>Lyrics not available</p>
                            </div>
                        )}
                        <div className="h-20"></div>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
        </>
    );
};

export default Player;
