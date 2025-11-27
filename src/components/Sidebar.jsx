import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaBook, FaPlus, FaHeart, FaMusic } from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Home', path: '/', icon: FaHome },
        { name: 'Search', path: '/search', icon: FaSearch },
        { name: 'Library', path: '/library', icon: FaBook }
    ];

    return (
        <div className="w-64 h-full bg-black flex flex-col p-6 border-r border-white/5">
            {/* Logo */}
            <div className="mb-10 px-2">
                <h1 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter group cursor-default">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
                        <FaMusic className="text-black text-sm" />
                    </div>
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:text-white transition-colors">
                        DHPF MUSIC
                    </span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 mb-8">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-300
                ${isActive
                                    ? 'bg-white/10 text-white shadow-lg shadow-white/5'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }
              `}
                        >
                            <Icon className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110 text-green-400' : ''}`} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>

            {/* Actions */}
            <div className="space-y-2">
                <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 group">
                    <div className="w-7 h-7 bg-gray-300 group-hover:bg-white rounded flex items-center justify-center text-black transition-colors shadow-md">
                        <FaPlus className="text-xs" />
                    </div>
                    <span className="text-sm font-bold">Create Playlist</span>
                </button>
                <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 group">
                    <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-blue-400 rounded flex items-center justify-center text-white opacity-80 group-hover:opacity-100 transition-opacity shadow-md">
                        <FaHeart className="text-xs" />
                    </div>
                    <span className="text-sm font-bold">Liked Songs</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
