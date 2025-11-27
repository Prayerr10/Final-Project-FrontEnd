import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePlaylist = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        const newPlaylist = {
            name,
            description,
            image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop", // Default image
            songs: []
        };

        try {
            await axios.post('http://localhost:3000/playlists', newPlaylist);
            navigate('/');
        } catch (error) {
            console.error("Error creating playlist:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <h1 className="text-4xl font-bold mb-8 text-white">Create your playlist</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-2xl border border-zinc-800">
                <div className="mb-6 text-left">
                    <label className="block text-sm font-bold mb-2 text-gray-300">Name</label>
                    <input
                        type="text"
                        className="w-full bg-zinc-800 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="My Awesome Playlist"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-8 text-left">
                    <label className="block text-sm font-bold mb-2 text-gray-300">Description</label>
                    <textarea
                        className="w-full bg-zinc-800 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition h-32 resize-none"
                        placeholder="Add an optional description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-black font-bold py-3 px-8 rounded-full hover:scale-105 hover:bg-green-400 transition w-full shadow-lg"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreatePlaylist;
