import { useMemo } from 'react'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { usePlayer } from '../context/PlayerContext'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1454922915609-78549ad709bb?auto=format&fit=crop&w=600&q=80'

const formatTime = (valueInSeconds) => {
  if (!Number.isFinite(valueInSeconds)) return '0:00'
  const minutes = Math.floor(valueInSeconds / 60)
  const seconds = Math.floor(valueInSeconds % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    error,
    togglePlay,
    seek,
    setVolumeLevel,
    audioRef,
  } = usePlayer()

  const progressPercent = useMemo(() => {
    if (!duration) return 0
    return Math.min(100, Math.max(0, (progress / duration) * 100))
  }, [progress, duration])

  const handlePrev = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      seek(0)
    }
  }

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      seek(0)
    }
  }

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-900 text-white shadow-2xl shadow-black/40">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
          <div className="flex flex-col">
            <p className="text-sm text-zinc-400 uppercase tracking-widest">No Track</p>
            <p className="text-lg font-semibold">-</p>
            <p className="text-sm text-zinc-400">-</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolumeLevel(Number(event.target.value))}
              className="w-40 accent-green-500"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white shadow-2xl shadow-black/50">
      <div className="mx-auto max-w-5xl px-6 py-3">
        {/* Progress Bar */}
        <div className="mb-2">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step="0.01"
            value={progress}
            onChange={(event) => seek(Number(event.target.value))}
            className="w-full h-1 accent-green-500 bg-zinc-800 rounded"
          />
          <div className="flex items-center justify-between text-xs text-zinc-400 mt-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center gap-3 flex-1">
            <div className="h-14 w-14 overflow-hidden rounded-lg">
              <img
                src={currentSong.imageUrl || FALLBACK_IMAGE}
                alt={currentSong.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-zinc-400 uppercase tracking-widest">Now Playing</p>
              <p className="text-lg font-semibold">{currentSong.title}</p>
              <p className="text-sm text-zinc-400">{currentSong.artist}</p>
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="text-gray-400 hover:text-white transition"
            >
              <BiSkipPrevious className="h-7 w-7" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center justify-center h-14 w-14 rounded-full bg-green-500 text-black shadow-lg transform transition hover:scale-105"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M8 5h3v14H8zm5 0h3v14h-3z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M7 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={handleNext}
              aria-label="Next"
              className="text-gray-400 hover:text-white transition"
            >
              <BiSkipNext className="h-7 w-7" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="text-xs text-zinc-400">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolumeLevel(Number(event.target.value))}
              className="w-40 accent-green-500"
            />
            <span className="text-xs text-zinc-400 w-10">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerBar
