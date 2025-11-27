import React from 'react';
import { FaUser, FaUsers } from 'react-icons/fa';

const TopBar = ({ onTeamClick }) => {
    return (
        <div className="flex justify-end items-center gap-x-4 mb-4">
            <button
                onClick={onTeamClick}
                className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition hover:scale-105 text-white/70 hover:text-white"
                title="About Us"
            >
                <FaUsers size={20} />
            </button>
            <div className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition cursor-pointer hover:scale-105 text-white/70 hover:text-white">
                <FaUser size={20} />
            </div>
        </div>
    );
};

export default TopBar;
