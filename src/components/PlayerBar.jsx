import { useMemo } from 'react'
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
  } = usePlayer()

  const progressPercent = useMemo(() => {
    if (!duration) return 0
    return Math.min(100, Math.max(0, (progress / duration) * 100))
  }, [progress, duration])

  if (!currentSong) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-30 w-[95%] max-w-4xl -translate-x-1/2 rounded-3xl border border-zinc-800 bg-zinc-950/80 px-6 py-4 text-white shadow-2xl shadow-black/50 backdrop-blur-2xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <div className="flex flex-1 items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-2xl">
            <img src={currentSong.imageUrl || FALLBACK_IMAGE} alt={currentSong.title} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-semibold text-white">{currentSong.title}</p>
            <p className="text-sm text-zinc-400">{currentSong.artist}</p>
            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M8 5h3v14H8zm5 0h3v14h-3z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M7 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex flex-1 flex-col gap-1">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step="0.01"
                value={progress}
                onChange={(event) => seek(Number(event.target.value))}
                className="w-full accent-emerald-400"
              />
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 md:w-auto md:min-w-[180px]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4 text-zinc-400">
            <path d="M13 5.23v13.54c0 .61-.7.96-1.2.6L7 15H4a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h3l4.8-4.37c.5-.36 1.2-.01 1.2.6z" />
          </svg>
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            onChange={(event) => setVolumeLevel(Number(event.target.value))}
            className="w-full accent-emerald-400 md:w-28"
          />
          <span className="text-xs text-zinc-400">{Math.round(volume * 100)}%</span>
        </div>
      </div>
      <div className="mt-2 h-1 rounded-full bg-zinc-800">
        <div className="h-full rounded-full bg-emerald-400" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  )
}

export default PlayerBar

