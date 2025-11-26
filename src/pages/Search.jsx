import { useState, useEffect } from 'react';
import { getAllSongs } from '../api/api';

const Search = () => {
    const [songs, setSongs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all songs on component mount
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                setLoading(true);
                const data = await getAllSongs();
                setSongs(data);
                setFilteredSongs(data);
                setError(null);
            } catch (err) {
                setError('Failed to load songs. Please make sure JSON server is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    // Filter songs locally based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredSongs(songs);
        } else {
            const filtered = songs.filter((song) => {
                const query = searchQuery.toLowerCase();
                return (
                    song.title.toLowerCase().includes(query) ||
                    song.artist.toLowerCase().includes(query)
                );
            });
            setFilteredSongs(filtered);
        }
    }, [searchQuery, songs]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Search Songs</h1>

            {/* Search Input Field */}
            <input
                type="text"
                placeholder="Search by title or artist..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    marginBottom: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            />

            {/* Loading State */}
            {loading && <p>Loading songs...</p>}

            {/* Error State */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Results Count */}
            {!loading && !error && (
                <p>Found {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''}</p>
            )}

            {/* Search Results - SIMPLE LIST */}
            {!loading && !error && (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {filteredSongs.length > 0 ? (
                        filteredSongs.map((song) => (
                            <li key={song.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
                                <strong>{song.title}</strong> - {song.artist}
                            </li>
                        ))
                    ) : (
                        <li>No songs found matching "{searchQuery}"</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Search;
