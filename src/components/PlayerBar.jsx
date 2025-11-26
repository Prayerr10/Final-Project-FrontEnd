import { useEffect, useState } from 'react'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { usePlayer } from '../context/PlayerContext'

const PlayerBar = () => {
  const { currentSong, isPlaying, togglePlay, playSong, audioRef } = usePlayer()
  const [volume, setVolume] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const [totalDuration, setTotalDuration] = useState(currentSong?.duration ?? 180) // seconds

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume, audioRef])

  // Dummy progress updater (visual only)
  useEffect(() => {
    if (!currentSong) {
      setProgress(0)
      return
    }

    // reset progress when track changes
    setProgress(0)
    setTotalDuration(currentSong?.duration ?? 180)
  }, [currentSong])

  // Sync progress with actual audio element when available
  useEffect(() => {
    const audio = audioRef?.current
    if (!audio) return

    const onTime = () => setProgress(Math.floor(audio.currentTime))
    const onLoaded = () => setTotalDuration(Math.floor(audio.duration) || totalDuration)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [audioRef, totalDuration])

  const handleToggle = () => {
    if (!currentSong) {
      playSong()
      return
    }
    togglePlay()

    // attempt direct control to ensure immediate response
    const audio = audioRef?.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      const p = audio.play()
      if (p?.catch) p.catch(() => null)
    }
  }

  const handlePrev = () => {
    // Placeholder: integrate with context when tracklist exists
    if (audioRef.current) audioRef.current.currentTime = 0
    setProgress(0)
  }

  const handleNext = () => {
    // Placeholder: integrate with context when tracklist exists
    if (audioRef.current) audioRef.current.currentTime = 0
    setProgress(0)
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
              onChange={(event) => setVolume(Number(event.target.value))}
              className="w-40 accent-green-500"
            />
          </div>
        </div>
      </div>
    )
  }

  // Convert seconds to mm:ss
  const fmt = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white shadow-2xl shadow-black/50">
      <div className="mx-auto max-w-5xl px-6 py-3">
        {/* Progress */}
        <div className="mb-2">
          <input
            type="range"
            min="0"
            max={totalDuration}
            step="1"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-1 accent-green-500 bg-zinc-800 rounded"
          />
          <div className="flex items-center justify-between text-xs text-zinc-400 mt-1">
            <span>{fmt(progress)}</span>
            <span>{fmt(totalDuration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm text-zinc-400 uppercase tracking-widest">Now Playing</p>
            <p className="text-lg font-semibold">{currentSong.title}</p>
            <p className="text-sm text-zinc-400">{currentSong.artist}</p>
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
              onClick={handleToggle}
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

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="w-40 accent-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerBar

