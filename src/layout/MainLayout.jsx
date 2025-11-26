import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PlayerBar from '../components/PlayerBar';

const MainLayout = () => {
    return (
        <div className="bg-zinc-950 min-h-screen text-white">
            <Sidebar />
            <div className="ml-64 pb-24 p-8">
                <Outlet />
            </div>
            <PlayerBar />
        </div>
    );
};

export default MainLayout;
