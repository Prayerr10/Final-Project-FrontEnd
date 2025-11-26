import React from 'react';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden font-sans">
            {/* Sidebar - Fixed width (w-64) */}
            <Sidebar />

            {/* Main Content Area - Flexible width */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Content - Scrollable area */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-black to-black relative">
                    {/* Decorative Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-green-900/20 to-transparent pointer-events-none"></div>

                    {/* Children Content */}
                    <div className="relative z-10">
                        {children}
                    </div>
                </main>

                {/* Player Bar - at the bottom */}
                <PlayerBar />
            </div>
        </div>
    );
};

export default Layout;
