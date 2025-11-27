import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PlayerBar from '../components/PlayerBar';
import TopBar from '../components/TopBar';
import AboutModal from '../components/AboutModal';
import ChristmasAnimation from '../components/ChristmasAnimation';

const MainLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnimationActive, setIsAnimationActive] = useState(false);

    const handleSurpriseClick = () => {
        setIsModalOpen(false);
        setIsAnimationActive(true);
    };

    return (
        <div className="bg-zinc-950 min-h-screen text-white relative">
            <Sidebar />

            <div className="absolute top-6 right-8 z-50">
                <TopBar onTeamClick={() => setIsModalOpen(true)} />
            </div>

            <div className="ml-64 pb-24 p-8">
                <Outlet />
            </div>
            <PlayerBar />

            <AboutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSurpriseClick={handleSurpriseClick}
            />

            <ChristmasAnimation
                isActive={isAnimationActive}
                onComplete={() => setIsAnimationActive(false)}
            />
        </div>
    );
};

export default MainLayout;
