import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import songsData from '../data/songs.json';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';

const Home = () => {
    const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
    const [imageErrors, setImageErrors] = useState({});

    // Greeting logic
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
    if (hour >= 18) greeting = 'Good evening';

    const handleImageError = (songId) => {
        setImageErrors(prev => ({ ...prev, [songId]: true }));
    };

    return (
        <div className="p-8 pb-32 min-h-full bg-gradient-to-b from-[#1e1e1e] to-black relative overflow-hidden">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-green-500/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            <h1 className="text-4xl font-black text-white mb-8 tracking-tight animate-fade-in relative z-10">
                {greeting}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 relative z-10">
                {songsData.map((song, index) => {
                    const isCurrent = currentSong?.id === song.id;
                    const hasError = imageErrors[song.id];

                    return (
                        <div
                            key={song.id}
                            className={`
                group p-4 rounded-xl transition-all duration-500 cursor-pointer relative overflow-hidden
                hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50
                ${isCurrent ? 'bg-white/10 ring-2 ring-green-500/50' : 'bg-[#181818] hover:bg-[#282828]'}
              `}
                            style={{
                                animationDelay: `${index * 50}ms`,
                                animation: 'fade-in-up 0.5s ease-out forwards'
                            }}
                            onClick={() => isCurrent ? togglePlay() : playSong(song.id)}
                        >
                            {/* Glowing effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 rounded-xl pointer-events-none"></div>

                            <div className="relative mb-4 aspect-square rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                                {!hasError ? (
                                    <img
                                        src={song.cover}
                                        alt={song.title}
                                        onError={() => handleImageError(song.id)}
                                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isCurrent && isPlaying ? 'scale-110' : ''}`}
                                    />
                                ) : (
                                    /* Fallback gradient cover */
                                    <div
                                        className="w-full h-full flex items-center justify-center"
                                        style={{
                                            background: `linear-gradient(135deg, ${song.color}dd 0%, ${song.color}33 100%)`
                                        }}
                                    >
                                        <div className="text-center">
                                            <FaMusic className="text-6xl text-white/80 mb-2 mx-auto" />
                                            <div className="text-xs text-white/60 font-bold px-4">{song.title}</div>
                                        </div>
                                    </div>
                                )}

                                {/* Playing Overlay with Equalizer */}
                                {isCurrent && isPlaying && (
                                    <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-4 gap-1">
                                        <div className="w-1.5 bg-green-400 animate-[bounce_0.6s_infinite] h-4 rounded-full shadow-lg shadow-green-500/50"></div>
                                        <div className="w-1.5 bg-green-400 animate-[bounce_0.8s_infinite] h-8 rounded-full shadow-lg shadow-green-500/50"></div>
                                        <div className="w-1.5 bg-green-400 animate-[bounce_1.1s_infinite] h-6 rounded-full shadow-lg shadow-green-500/50"></div>
                                        <div className="w-1.5 bg-green-400 animate-[bounce_0.9s_infinite] h-5 rounded-full shadow-lg shadow-green-500/50"></div>
                                    </div>
                                )}

                                {/* Play Button Overlay */}
                                <div className={`
                  absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full 
                  flex items-center justify-center shadow-xl shadow-green-500/40
                  transition-all duration-300 transform translate-y-4 opacity-0
                  group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/60
                  ${isCurrent && isPlaying ? 'opacity-0' : ''}
                `}>
                                    <FaPlay className="text-black text-lg ml-1" />
                                </div>
                            </div>

                            <h3 className={`font-bold text-base truncate mb-1 transition-colors duration-300 ${isCurrent ? 'text-green-400' : 'text-white group-hover:text-green-400'}`}>
                                {song.title}
                            </h3>
                            <p className="text-sm text-gray-400 truncate font-medium group-hover:text-gray-300 transition-colors">
                                {song.artist}
                            </p>
                        </div>
                    );
                })}
            </div>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default Home;
