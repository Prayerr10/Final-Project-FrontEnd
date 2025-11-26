import { useEffect, useState } from 'react'
import { getAllSongs } from '../api/api'
import SongCard from '../components/SongCard'
import { usePlayer } from '../context/PlayerContext'

const Home = () => {
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { playSong } = usePlayer()

  useEffect(() => {
    let ignore = false

    const fetchSongs = async () => {
      try {
        const data = await getAllSongs()
        if (!ignore) {
          setSongs(data)
        }
      } catch (err) {
        if (!ignore) {
          setError('Gagal memuat daftar lagu. Coba lagi beberapa saat.')
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    fetchSongs()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-widest text-emerald-400">Selamat datang</p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Playlist Favorit Minggu Ini</h1>
          <p className="text-sm text-zinc-400">
            Pilih lagu untuk diputar dan nikmati nuansa Spotify versi kamu sendiri.
          </p>
        </header>

        {isLoading && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="animate-pulse rounded-2xl bg-zinc-900/60 p-4">
                <div className="mb-4 aspect-square rounded-xl bg-zinc-800" />
                <div className="mb-2 h-4 rounded-full bg-zinc-800" />
                <div className="h-3 w-2/3 rounded-full bg-zinc-800" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <p className="rounded-xl bg-red-500/10 p-4 text-sm text-red-300">{error}</p>
        )}

        {!isLoading && !error && songs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-zinc-400">
            Belum ada lagu. Tambahkan lagu pertamamu!
          </div>
        )}

        {!isLoading && !error && songs.length > 0 && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} onClick={() => playSong(song)} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Home
