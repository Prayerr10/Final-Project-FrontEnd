import React, { useState } from 'react';
import { convertYoutubeLink } from '../../api/youtubeService';

const ConverterCard = () => {
    const [inputUrl, setInputUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [songData, setSongData] = useState(null);
    const [error, setError] = useState('');

    const handleConvert = async () => {
        if (!inputUrl.trim()) {
            setError("Mohon masukkan Link YouTube terlebih dahulu.");
            return;
        }

        setIsLoading(true);
        setError('');
        setSongData(null);

        try {
            const result = await convertYoutubeLink(inputUrl);

            setSongData(result);
            console.log("Data diterima:", result);
        } catch (err) {
            setError(err.message || 'Terjadi Kesalahan yang tidak diketahui.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full max-w-lg mx-auto mt-10'>
            <div className='bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-2xl'>
                <h2 className='text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
                    VibeVault Converter
                </h2>

                <div className='flex flex-col gap-4'>
                    <input 
                        type="text"
                        placeholder='Paste Link Youtube Di sini...'
                        className='w-full bg-slate-800 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-500'
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)} 
                    />

                    <button
                        onClick={handleConvert}
                        disabled={isLoading}
                        className={`w-full py-3 rounded-xl font-bold text-white transition-all transform active:scale-95
                            ${isLoading
                                ? 'bg-slate-600 cursor-wait opacity-70'
                                : 'bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/30'
                            }`}
                    >
                        {isLoading ? 'Sedang Memproses...' : "Convert to MP3"} 
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm text-center animate-pulse">
                      {error}
                    </div>
                )}
            </div>

            {songData && (
                <div className="mt-6 bg-slate-800 border border-slate-600 rounded-2xl p-4 flex gap-4 items-center shadow-xl animate-bounce-in">
                  <div className='relative group shrink-0'>
                    <img
                        src={songData.coverUrl}
                        alt="Album Art"
                        className="w-24 h-24 object-cover rounded-xl shadow-md"
                    />
                    <div className='absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity'>
                        <span className='text-white text-2xl'>Play</span>
                    </div>
                  </div>

                  <div className='flex-1 min-w-0'>
                    <h3 className='text-white font-bold text-lg truncate'>
                        {songData.title}
                    </h3>
                    <p className="text-cyan-400 text-sm mb-3">
                        {songData.artist}
                    </p>
                    <div className='flex gap-2'>
                        <button className='flex-1 bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2 rounded-lg transition-colors'>
                            Download MP3
                        </button>
                        <button className='px-3 border border-slate-500 text-slate-300 hover:text-white hover:border-white rounded-lg transition-colors text-xs font-bold'>
                            + PlayList
                        </button>
                    </div>
                  </div>
                </div>
            )}
        </div>
    );
};

export default ConverterCard;