import './App.css'
import PlayerBar from './components/PlayerBar.jsx'
import { usePlayer } from './context/PlayerContext.jsx'

const songs = [
  {
    id: 1,
    title: 'City Lights',
    artist: 'Midnight Arcade',
    url: 'https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.wav',
    artwork: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Golden Hour',
    artist: 'Luna Waves',
    url: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav',
    artwork: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=600&q=80',
  },
]

const SongList = () => {
  const { currentSong, isPlaying, playSong, pauseSong, togglePlay } = usePlayer()

  const handleAction = (song) => {
    if (!currentSong || currentSong.id !== song.id) {
      playSong(song)
      return
    }

    if (isPlaying) {
      pauseSong()
    } else {
      togglePlay()
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {songs.map((song) => {
        const isCurrent = currentSong?.id === song.id
        return (
          <article
            key={song.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:border-lime-400/60"
          >
            <img src={song.artwork} alt={song.title} className="mb-4 h-52 w-full rounded-xl object-cover" />
            <p className="text-sm uppercase tracking-[0.25em] text-lime-400">single</p>
            <h3 className="text-2xl font-semibold text-white">{song.title}</h3>
            <p className="text-zinc-200">{song.artist}</p>
            <button
              type="button"
              onClick={() => handleAction(song)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-2 font-semibold text-zinc-950 transition hover:-translate-y-0.5"
            >
              {isCurrent && isPlaying ? 'Pause' : 'Play'}
            </button>
          </article>
        )
      })}
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <header className="mx-auto flex max-w-5xl flex-col gap-2 px-6 pt-16 pb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-lime-400">discover</p>
        <h1 className="text-4xl font-bold">Prompt The DJ</h1>
        <p className="text-zinc-300">
          Pilih lagu favoritmu dan nikmati kontrol penuh dengan Player Bar interaktif di bawah layar.
        </p>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-32">
        <SongList />
      </main>

      <PlayerBar />
    </div>
  )
}

export default App
