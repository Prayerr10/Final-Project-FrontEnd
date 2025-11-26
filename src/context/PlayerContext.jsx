import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const PlayerContext = createContext(undefined)

const demoSongBase64 = [
  'UklGRsAIAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YZwIAAAAAO4XBC9xRHVXY2esc+F7t38Mf+Z5c3AKYyJSVT5VKOkQ5fgg4XLKqLV9o5WU',
  'd4mHggOABIJ1iB6TnqFys/nHet4q9jEOuiXtOwRQSGEebwl5r37ef4l80XT6aG9ZvUaMMZwavALE6orT4r2Pqj+aho3XhH+Ap4BMhUWOQZvKq0u/FdVi7GAE',
  'NxwPMxpImlroaXp16Hzuf3F+fnhLbjVguk55OickkAyH9ObcgcYjsoSgRJLih7yBC4DcghiKe5WhpP+28cu44oj6iRLjKcI/YlMSZDpxY3o8f5h/dHv2cmlm',
  'QVYNQ3wtUBZc/nbmds8tulqnp5eii7iDMIAqgZ2GWJADniKvHMM72bjwvwh3IAo3rUukXU1sJXfKff5/sH3ydgNsRF07S4w27x8zCC3wttihwrauqZ0TkHGG',
  'GIE4gNqD3Yv5l7+norr4z//m6P7aFv8thEOoVr1mM3OZe6N/LX86evhwumP4Ukk/Xin+Efz5MOJxy422P6QuleGJv4IIgNOBEoiMkuKgkrL+xmzdE/UbDa4k',
  '9TopT5Fgkm6teIZ+6X/JfEJ1mWk3WqZHjjKuG9QD2OuR1NO+YavqmgWOJIWZgIyA/YTFjZWa+Kpavg7UTutIAyUbDTIyR9NZSmkKdap843+bftt42W7tYJdP',
  'cjs0JaYNnvXz3XzHArNAodWSRIjrgQWAo4KsieGU3qMatvLKqOFx+XMR2SjPPo1SYmO2cBB6HH+tf717cHMRZw9X+0OBLmQXdP+J53rQGLslqEqYGIz9g0CA',
  'BoFFhtCPT51KribCMNii76cHaB8NNspK5Fy3a752lX3+f+N9WHeYbANeHUyJN/4gSglD8cHZl8OPr12enJDKhj2BKYCXg2iLVpf1pri59c7t5dD9xhX5LJZC',
  '2VUVZrhyT3uNf0t/jHp7cWlkzVM8QGcqExMU+0HjccxztwOlyZVOivqCDoCmgbKH/JEnoLSxBMZf3PzzBAyhI/w5TE7ZXwRuTnhafvJ/Bn2ydTdq/VqNSI8z',
  'vxzsBO3smdXEvzOsl5uFjnSFtYBzgLGESI3rmSeqar0H0zrqMAITGgsxSEYLWapomHRpfNd/w342eWRvo2FxUGk8Pya9Drb2At93yOOz/aFok6iIHYICgGuC',
  'QolJlByjNrXzyZjgWfheENAn2j22UbFiMHC7efp+wH8DfOhztmfbV+hEhi93GIwAnOh/0QW88ajvmJCMQ4RTgOSA8IVKj56cc60xwSfXje6PBlgeDjXmSSJc',
  'H2tUdl19+38Vfrx3K23AXv5MhDgNImIKWvLM2o7EabATnyeRJYdlgR2AVoP2iraWLabOuPPN2+S4/LIU8iumQQhVa2U7cgN7dH9nf9x6+3EWZZ9ULUFvKygU',
  'LPxS5HLNWrjJpWeWvoo3gxeAeoFTh26Rb5/XsAvFUtvl8u0KlCICOW5NHl90be53LX74f0F9H3bSasFbc0mPNNAdBAYC7qLWt8AIrUacCI/GhdOAXYBnhM2M',
  'Q5lYqXy8AdIm6RgBARkIMF5FQVgHaCN0JnzIf+h+j3ntb1diSlFfPUon0w/N9xHgdMnFtLyi/ZMOiVCCAoA2gtuIs5NcolO09siJ30H3SA/FJuQ83lD9Yahv',
  'Y3nWftB/SHxedFlopljTRYowihmkAbDphNLzvL+pl5kKjYyEaIDEgJ2Fxo7um56sPsAd1nfteAVIHQ80AUlfW4Vq6HUkffV/RH4eeLxtfF/dTX85GiN5C3Dz',
  '2duHxUaxy5+1kYKHj4ESgBiDhooYlmal5rfxzMnjoPueE+sqtUA2VL9ku3G0ell/gX8pe3pywWVxVR5Cdiw8FUT9ZOV0zkO5kaYGly+Ld4MigFGB94bikLie',
  '/K8TxEbaz/HWCYYhBziOTGJe4myLd/x9/X95fYl2a2uDXFhKjjXgHhsHF++r16vB3q32nI2PGob0gEmAH4RUjJ2Yi6iPu/zQEugAAO4XBC9xRHVXY2esc+F7',
  't38Mf+Z5c3AKYyJSVT5VKOkQ5fgg4XLKqLV9o5WUd4mHggOABIJ1iB6TnqFys/nHet4q9jEOuiXtOwRQSGEebwl5r37ef4l80XT6aG9ZvUaMMZwavALE6orT',
  '4r2Pqj+aho3XhH+Ap4BMhUWOQZvKq0u/FdVi7GAENxwPMxpImlroaXp16Hzuf3F+fnhLbjVguk55OickkAyH9ObcgcYjsoSgRJLih7yBC4DcghiKe5WhpP+2',
  '8cu44oj6iRLjKcI/YlMSZDpxY3o8f5h/dHv2cmlmQVYNQ3wtUBZc/nbmds8tulqnp5eii7iDMIAqgZ2GWJADniKvHMM72bjwvwh3IAo3rUukXU1sJXfKff5/',
  'sH3ydgNsRF07S4w27x8zCC3wttihwrauqZ0TkHGGGIE4gNqD3Yv5l7+norr4z//m6P7aFv8thEOoVr1mM3OZe6N/LX86evhwumP4Ukk/Xin+Efz5MOJxy422',
  'P6QuleGJv4IIgNOBEoiMkuKgkrL+xmzdE/UbDa4k9TopT5Fgkm6teIZ+6X/JfEJ1mWk3WqZHjjKuG9QD2OuR1NO+YavqmgWOJIWZgIyA/YTFjZWa+Kpavg7U',
  'TutIAyUbDTIyR9NZSmkKdap843+bftt42W7tYJdPcjs0JaYNnvXz3XzHArNAodWSRIjrgQWAo4KsieGU3qMatvLKqOFx+XMR2SjPPo1SYmO2cBB6HH+tf717',
  'cHMRZw9X+0OBLmQXdP+J53rQGLslqEqYGIz9g0CABoFFhtCPT51KribCMNii76cHaB8NNspK5Fy3a752lX3+f+N9WHeYbANeHUyJN/4gSglD8cHZl8OPr12e',
  'nJDKhj2BKYCXg2iLVpf1pri59c7t5dD9xhX5LJZC2VUVZrhyT3uNf0t/jHp7cWlkzVM8QGcqExMU+0HjccxztwOlyZVOivqCDoCmgbKH/JEnoLSxBMZf3A==',
].join('')

const demoSong = {
  id: 'demo-track',
  title: 'Neon Skyline',
  artist: 'Prompted DJ',
  url: `data:audio/wav;base64,${demoSongBase64}`,
  artwork: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=600&q=80',
}

const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(demoSong)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const playSong = useCallback((song) => {
    const nextSong = song ?? demoSong
    setCurrentSong({ ...nextSong })
    setIsPlaying(true)
  }, [])

  const pauseSong = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(() => {
    if (!currentSong) return
    setIsPlaying((prev) => !prev)
  }, [currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) {
      return
    }

    if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise?.catch) {
        playPromise.catch(() => setIsPlaying(false))
      }
    } else {
      audio.pause()
    }
  }, [currentSong, isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [])

  const value = useMemo(
    () => ({
      currentSong,
      isPlaying,
      playSong,
      pauseSong,
      togglePlay,
      audioRef,
    }),
    [currentSong, isPlaying, playSong, pauseSong, togglePlay],
  )

  useEffect(() => {
    console.log('[PlayerContext]', { currentSong, isPlaying })
  }, [currentSong, isPlaying])

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src={currentSong?.url ?? undefined} className="hidden" />
    </PlayerContext.Provider>
  )
}

const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}

export { PlayerContext, PlayerProvider, usePlayer }
