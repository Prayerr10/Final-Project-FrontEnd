import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

const LOCAL_STORAGE_KEY = 'farlen_songs'
const FALLBACK_SONGS = [
  {
    id: 'seed-1',
    title: 'Lofi Study Beats',
    artist: 'Lofi Girl',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=600&q=80',
  },
]

const hasBrowserStorage = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

const readLocalSongs = () => {
  if (!hasBrowserStorage) return FALLBACK_SONGS

  const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (error) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(FALLBACK_SONGS))
  return FALLBACK_SONGS
}

const writeLocalSongs = (songs) => {
  if (!hasBrowserStorage) return
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(songs))
}

export const getAllSongs = async () => {
  try {
    const { data } = await api.get('/songs')
    writeLocalSongs(data)
    return data
  } catch (error) {
    return readLocalSongs()
  }
}

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  if (hasBrowserStorage) {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }
  return `fallback-${Math.random().toString(36).slice(2, 9)}`
}

export const createSong = async (payload) => {
  try {
    const { data } = await api.post('/songs', payload)
    const nextSongs = [...readLocalSongs(), data]
    writeLocalSongs(nextSongs)
    return data
  } catch (error) {
    const fallbackSong = {
      id: generateId(),
      ...payload,
    }
    const nextSongs = [...readLocalSongs(), fallbackSong]
    writeLocalSongs(nextSongs)
    return fallbackSong
  }
}

export default api


