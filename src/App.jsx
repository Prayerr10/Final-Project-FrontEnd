import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import CreatePlaylist from './pages/CreatePlaylist';
import Library from './pages/Library';
import LikedSongs from './pages/LikedSongs';
import PlaylistDetails from './pages/PlaylistDetails';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="create-playlist" element={<CreatePlaylist />} />
                <Route path="library" element={<Library />} />
                <Route path="liked-songs" element={<LikedSongs />} />
                <Route path="playlist/:id" element={<PlaylistDetails />} />
            </Route>
        </Routes>
    );
};

export default App;
