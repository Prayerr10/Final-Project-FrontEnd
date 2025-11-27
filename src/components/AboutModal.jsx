import React from 'react';
import { FaTimes, FaGift } from 'react-icons/fa';

const AboutModal = ({ isOpen, onClose, onSurpriseClick }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 max-w-2xl w-full relative shadow-2xl animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                    <FaTimes size={24} />
                </button>

                <h2 className="text-3xl font-bold text-white mb-6 text-center">About Us</h2>

                <div className="space-y-6 text-gray-300">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">The Team</h3>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Gerungan, Dave Jordy</li>
                            <li>Kaawoan, Prayer Yosua Immanuel</li>
                            <li>Munggilung, Farlen bernet</li>
                            <li>Jocom, Hulio Klose Bastian</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">About This Project</h3>
                        <p>
                            This website is our Final Project for the <strong>Front-End Development</strong> course.
                        </p>
                    </div>

                    <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/30">
                        <h3 className="text-lg font-bold text-indigo-300 mb-2">Special Thanks</h3>
                        <p>
                            We would like to express our deepest gratitude to our lecturer, <strong>Sir Stenly Adam</strong>.
                            Thank you for teaching us from scratch (0) until we could implement this knowledge into building this website.
                            Your guidance has been invaluable.
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onSurpriseClick}
                        className="bg-gradient-to-r from-red-600 to-green-600 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition shadow-lg flex items-center gap-2 animate-pulse"
                    >
                        <FaGift /> Click for a Surprise!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;
