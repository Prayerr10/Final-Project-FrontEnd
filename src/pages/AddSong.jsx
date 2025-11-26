import { useState } from 'react'

const defaultValues = {
  title: '',
  artist: '',
  audioUrl: '',
  imageUrl: '',
}

const AddSong = () => {
  const [formValues, setFormValues] = useState(defaultValues)
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage(`Dummy submit: ${formValues.title || 'Tanpa Judul'} tersimpan sementara.`)
    setFormValues(defaultValues)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-widest text-emerald-400">Tambah Lagu</p>
          <h1 className="text-3xl font-bold text-white">Lengkapi detail lagu baru</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Pastikan URL audio dan cover image dapat diakses publik.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8 shadow-2xl shadow-black/20"
        >
          {message && (
            <p className="rounded-xl bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">{message}</p>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200" htmlFor="title">
              Judul Lagu
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formValues.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-transparent bg-zinc-900/70 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:bg-zinc-900 focus:outline-none"
              placeholder="Contoh: Blue Bird"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200" htmlFor="artist">
              Artis
            </label>
            <input
              id="artist"
              name="artist"
              type="text"
              required
              value={formValues.artist}
              onChange={handleChange}
              className="w-full rounded-2xl border border-transparent bg-zinc-900/70 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:bg-zinc-900 focus:outline-none"
              placeholder="Contoh: Ikimonogakari"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200" htmlFor="audioUrl">
              URL Audio
            </label>
            <input
              id="audioUrl"
              name="audioUrl"
              type="url"
              required
              value={formValues.audioUrl}
              onChange={handleChange}
              className="w-full rounded-2xl border border-transparent bg-zinc-900/70 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:bg-zinc-900 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200" htmlFor="imageUrl">
              URL Cover Image
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              required
              value={formValues.imageUrl}
              onChange={handleChange}
              className="w-full rounded-2xl border border-transparent bg-zinc-900/70 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:bg-zinc-900 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-500/90 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            Simpan Lagu (Dummy)
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddSong


