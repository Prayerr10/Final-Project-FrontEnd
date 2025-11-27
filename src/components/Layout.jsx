import React from 'react';
import Sidebar from './Sidebar';
import Player from './Player';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden font-sans">
            {/* Sidebar - Fixed width (w-64) */}
            <Sidebar />

            {/* Main Content Area - Flexible width */}
            <div className="flex-1 flex flex-col overflow-hidden relative bg-[#121212] rounded-lg my-2 mr-2">
                {/* Content - Scrollable area */}
                <main className="flex-1 overflow-y-auto relative scrollbar-hide">
                    {children}
                </main>

                {/* Player Bar Area - 90px height reserved */}
                <div className="h-[90px] w-full fixed bottom-0 left-0 z-50">
                    <Player />
                </div>
            </div>
        </div>
    );
};

export default Layout;
