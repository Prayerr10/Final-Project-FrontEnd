const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1454922915609-78549ad709bb?auto=format&fit=crop&w=600&q=80'

const SongCard = ({ song, onClick }) => {
  const { title, artist, imageUrl } = song || {}

  const handleClick = () => {
    if (onClick) {
      onClick(song)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => event.key === 'Enter' && handleClick()}
      className="group rounded-2xl bg-zinc-900/70 hover:bg-zinc-800 transition duration-200 p-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <img
          src={imageUrl || FALLBACK_IMAGE}
          alt={title}
          className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
        />

        <button
          type="button"
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/90 text-black opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition duration-200 shadow-lg shadow-emerald-500/40"
          onClick={(event) => {
            event.stopPropagation()
            handleClick()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path d="M7 5.5v13l11-6.5-11-6.5z" />
          </svg>
        </button>
      </div>

      <div className="mt-4">
        <p className="font-semibold text-white truncate">{title}</p>
        <p className="text-sm text-zinc-400 truncate">{artist}</p>
      </div>
    </div>
  )
}

export default SongCard

