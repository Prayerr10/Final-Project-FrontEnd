import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const PlayerContext = createContext(null)

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(typeof window !== 'undefined' ? new Audio() : null)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [error, setError] = useState(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    const handleLoadedMetadata = () => setDuration(audio.duration || 0)
    const handleTimeUpdate = () => setProgress(audio.currentTime || 0)
    const handleEnded = () => setIsPlaying(false)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => {
      setError('Tidak dapat memutar audio ini.')
      setIsPlaying(false)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  const ensureSource = useCallback((song) => {
    const audio = audioRef.current
    if (!audio || !song?.audioUrl) return null
    if (audio.src !== song.audioUrl) {
      audio.src = song.audioUrl
    }
    return audio
  }, [])

  const playSong = useCallback((song) => {
    if (!song?.audioUrl) {
      setError('Audio URL tidak tersedia untuk lagu ini.')
      return
    }
    setCurrentSong({ ...song })
    const audio = ensureSource(song)
    if (!audio) return

    audio.currentTime = 0
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setError('Autoplay diblokir. Tekan tombol play manual.')
        setIsPlaying(false)
      })
  }, [])

  const pauseSong = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }, [])

  const resumeSong = useCallback(() => {
    if (!currentSong) return
    const audio = ensureSource(currentSong)
    if (!audio) return
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setError('Tidak dapat memutar audio ini.'))
  }, [])

  const togglePlay = useCallback(() => {
    if (!currentSong) return
    if (isPlaying) {
      pauseSong()
    } else {
      resumeSong()
    }
  }, [currentSong, isPlaying, pauseSong, resumeSong])

  const seek = useCallback((timeInSeconds) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = timeInSeconds
    setProgress(timeInSeconds)
  }, [])

  const setVolumeLevel = useCallback((value) => {
    const audio = audioRef.current
    if (!audio) return
    const nextVolume = Math.min(1, Math.max(0, value))
    audio.volume = nextVolume
    setVolume(nextVolume)
  }, [])

  const value = useMemo(
    () => ({
      currentSong,
      isPlaying,
      duration,
      progress,
      volume,
      error,
      playSong,
      pauseSong,
      resumeSong,
      togglePlay,
      seek,
      setVolumeLevel,
    }),
    [
      currentSong,
      isPlaying,
      duration,
      progress,
      volume,
      error,
      playSong,
      pauseSong,
      resumeSong,
      togglePlay,
      seek,
      setVolumeLevel,
    ],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used inside PlayerProvider')
  }
  return context
}


