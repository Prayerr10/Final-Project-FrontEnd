import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaBook, FaPlus, FaHeart, FaCrown } from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Home', path: '/', icon: FaHome },
        { name: 'Search', path: '/search', icon: FaSearch },
        { name: 'Library', path: '/library', icon: FaBook }
    ];

    return (
        <div className="w-64 h-full flex flex-col relative overflow-hidden bg-black border-r border-white/10">
            {/* Animated Gradient Orbs Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950"></div>
            <div
                className="absolute top-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
                style={{ animation: 'pulse 8s ease-in-out infinite' }}
            ></div>

            <div className="relative z-10 flex flex-col h-full p-6">
                {/* Logo Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-1">
                        <h1 className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            DHPF
                        </h1>
                        <div className="px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded text-[10px] font-black text-white flex items-center gap-1">
                            <FaCrown /> PRO
                        </div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 tracking-widest">MUSIC</p>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                  flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive
                                        ? 'bg-white/10 text-white shadow-lg border border-white/5'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                `}
                            >
                                <Icon className={`text-xl transition-transform duration-300 ${isActive ? 'text-green-400 scale-110' : 'group-hover:text-white'}`} />
                                <span className="font-bold">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Actions */}
                <div className="space-y-3">
                    <button className="
            w-full flex items-center space-x-3 px-4 py-3 
            bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl
            text-gray-300 hover:text-white transition-all duration-300 group
          ">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <FaPlus className="text-white text-xs" />
                        </div>
                        <span className="font-bold text-sm">Create Playlist</span>
                    </button>

                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-400 hover:text-white transition-colors">
                        <FaHeart className="text-purple-400" />
                        <span className="font-medium text-sm">Liked Songs</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
