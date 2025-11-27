import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChristmasAnimation = ({ isActive, onComplete }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => {
                onComplete();
                navigate('/');
            }, 20000); // 20 seconds

            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete, navigate]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 bg-red-950/90 z-[60] flex flex-col items-center justify-center overflow-hidden">
            {/* Snowflakes */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-white opacity-70 animate-fall"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-10%`,
                            fontSize: `${Math.random() * 20 + 10}px`,
                            animationDuration: `${Math.random() * 5 + 5}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>

            {/* Flying Santa */}
            <div className="absolute top-1/4 -left-32 text-8xl animate-fly-santa opacity-0" style={{ animationDelay: '12s' }}>
                🎅🛷🦌
            </div>

            <div className="text-center z-10 flex flex-col items-center gap-8">
                <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] font-serif animate-fade-in-slow opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                    Dear All
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold text-green-400 drop-shadow-lg animate-fade-in opacity-0" style={{ animationDelay: '4s', animationFillMode: 'forwards' }}>
                    Terima Kasih
                </h2>
                <h2 className="text-5xl md:text-7xl font-extrabold text-red-500 drop-shadow-[0_0_25px_rgba(255,0,0,0.8)] tracking-wider animate-bounce-in opacity-0" style={{ animationDelay: '7s', animationFillMode: 'forwards' }}>
                    MERRY CHRISTMAS
                </h2>
            </div>

            <style>{`
                @keyframes fall {
                    0% { transform: translateY(-10vh) rotate(0deg); }
                    100% { transform: translateY(110vh) rotate(360deg); }
                }
                .animate-fall {
                    animation-name: fall;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                
                @keyframes fade-in-slow {
                    0% { opacity: 0; transform: scale(0.9); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-slow {
                    animation: fade-in-slow 3s ease-out;
                }

                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 2s ease-out;
                }

                @keyframes bounce-in {
                    0% { opacity: 0; transform: scale(0.3); }
                    50% { opacity: 1; transform: scale(1.05); }
                    70% { transform: scale(0.9); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-bounce-in {
                    animation: bounce-in 1.5s cubic-bezier(0.215, 0.610, 0.355, 1.000);
                }

                @keyframes fly-santa {
                    0% { left: -20%; opacity: 1; transform: translateY(0) rotate(5deg); }
                    25% { transform: translateY(-20px) rotate(-5deg); }
                    50% { transform: translateY(0) rotate(5deg); }
                    75% { transform: translateY(-20px) rotate(-5deg); }
                    100% { left: 120%; opacity: 1; transform: translateY(0) rotate(5deg); }
                }
                .animate-fly-santa {
                    animation: fly-santa 8s linear;
                }
            `}</style>
        </div>
    );
};

export default ChristmasAnimation;
