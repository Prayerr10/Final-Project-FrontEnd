import SongCard from '../components/SongCard'

const DUMMY_DATA = [
  {
    id: 'dummy-1',
    title: 'Neon Nights',
    artist: 'The Midnight City',
    imageUrl:
      'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dummy-2',
    title: 'Ocean Breeze',
    artist: 'Luna Wave',
    imageUrl:
      'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dummy-3',
    title: 'Sunset Boulevard',
    artist: 'Retro Drive',
    imageUrl:
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dummy-4',
    title: 'Moonlight Echo',
    artist: 'Nova & Friends',
    imageUrl:
      'https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dummy-5',
    title: 'Skyline Dreams',
    artist: 'Future Pulse',
    imageUrl:
      'https://images.unsplash.com/photo-1454922915609-78549ad709bb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dummy-6',
    title: 'City Lights',
    artist: 'Electric Bloom',
    imageUrl:
      'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=600&q=80',
  },
]

const Home = () => {
  const handleSongClick = (song) => {
    // Dummy handler until backend/player ready
    window.alert(`Putar lagu: ${song.title} - ${song.artist}`)
  }

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-widest text-emerald-400">Selamat datang</p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Playlist Favorit Minggu Ini</h1>
          <p className="text-sm text-zinc-400">
            Gunakan data dummy ini untuk preview tampilan sampai backend siap.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {DUMMY_DATA.map((song) => (
            <SongCard key={song.id} song={song} onClick={() => handleSongClick(song)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home


