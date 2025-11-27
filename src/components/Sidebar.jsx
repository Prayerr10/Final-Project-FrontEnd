import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaPlusSquare, FaHeart } from 'react-icons/fa';
import { BiLibrary } from "react-icons/bi";

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "text-white" : "text-gray-400";
    };

    return (
        <div className="w-64 bg-black h-full fixed left-0 top-0 p-6 flex flex-col gap-y-6 z-40">
            <div className="flex flex-col gap-y-4">
                <Link to="/" className={`flex items-center gap-x-4 hover:text-white transition cursor-pointer ${isActive('/')}`}>
                    <FaHome size={24} />
                    <span className="font-bold text-md">Home</span>
                </Link>
                <Link to="/search" className={`flex items-center gap-x-4 hover:text-white transition cursor-pointer ${isActive('/search')}`}>
                    <FaSearch size={24} />
                    <span className="font-bold text-md">Search</span>
                </Link>
                <Link to="/library" className={`flex items-center gap-x-4 hover:text-white transition cursor-pointer ${isActive('/library')}`}>
                    <BiLibrary size={24} />
                    <span className="font-bold text-md">Your Library</span>
                </Link>
            </div>

            <div className="mt-6 flex flex-col gap-y-4">
                <Link to="/create-playlist" className={`flex items-center gap-x-4 hover:text-white transition cursor-pointer ${isActive('/create-playlist')}`}>
                    <div className="bg-gray-200 p-1 rounded-sm">
                        <FaPlusSquare size={20} className="text-black" />
                    </div>
                    <span className="font-bold text-sm">Create Playlist</span>
                </Link>
                <Link to="/liked-songs" className={`flex items-center gap-x-4 hover:text-white transition cursor-pointer ${isActive('/liked-songs')}`}>
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-300 p-1 rounded-sm opacity-90">
                        <FaHeart size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-sm">Liked Songs</span>
                </Link>
            </div>

            <div className="mt-auto border-t border-zinc-800 pt-4">
                <div className="text-xs text-gray-500 flex flex-col gap-y-2">
                    <p className="hover:underline cursor-pointer">Cookies</p>
                    <p className="hover:underline cursor-pointer">Privacy</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
