import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import PlayerBar from './components/PlayerBar'
import AddSong from './pages/AddSong'
import Home from './pages/Home'

const navLinkClass =
  'text-sm font-medium text-zinc-400 hover:text-white transition px-4 py-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400'

const App = () => (
  <div className="min-h-screen bg-black text-white">
    <nav className="sticky top-0 z-20 border-b border-zinc-900 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-lg font-semibold text-white">
          Farlen Music
        </NavLink>

        <div className="flex items-center gap-2 rounded-full bg-zinc-900/60 p-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? 'bg-zinc-800 text-white' : ''}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? 'bg-zinc-800 text-white' : ''}`
            }
          >
            Tambah Lagu
          </NavLink>
        </div>
      </div>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddSong />} />
    </Routes>

    <PlayerBar />
  </div>
)

export default App
