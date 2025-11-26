import { useEffect, useState } from 'react'
import { usePlayer } from '../context/PlayerContext'

const PlayerBar = () => {
  const { currentSong, isPlaying, togglePlay, playSong, audioRef } = usePlayer()
  const [volume, setVolume] = useState(0.7)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume, audioRef])

  const handleToggle = () => {
    if (!currentSong) {
      playSong()
      return
    }
    togglePlay()
  }

  if (!currentSong) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-zinc-900 text-white shadow-2xl shadow-black/40">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        <div className="flex flex-col">
          <p className="text-sm text-zinc-400 uppercase tracking-widest">Now Playing</p>
          <p className="text-lg font-semibold">{currentSong.title}</p>
          <p className="text-sm text-zinc-400">{currentSong.artist}</p>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-lime-500 text-zinc-950 shadow-lg transition hover:scale-105"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 fill-current">
              <path d="M8 5h3v14H8zm5 0h3v14h-3z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 fill-current">
              <path d="M7 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400">Volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="w-40 accent-lime-500"
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerBar

