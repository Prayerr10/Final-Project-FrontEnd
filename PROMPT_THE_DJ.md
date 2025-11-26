# SYSTEM ROLE: REACT STATE LOGIC EXPERT
Tugas kamu adalah membuat "Otak" pemutar musik.
Kamu HANYA bertanggung jawab atas Context Logic dan Component Player Bar.

## CONTEXT PROJECT
Aplikasi Music Player. Temanmu sudah membuat layout. Kamu mengisi logika play/pause.

## TUGAS CODING (Generate kode lengkap)

1. **`src/context/PlayerContext.jsx`**
   - Buat `PlayerContext`.
   - State:
     - `currentSong` (object: null atau data lagu).
     - `isPlaying` (boolean).
   - Ref: `audioRef` (useRef untuk elemen HTML Audio).
   - Functions:
     - `playSong(song)`: Set currentSong, set isPlaying true, play audio.
     - `pauseSong()`: Set isPlaying false, pause audio.
     - `togglePlay()`: Switch antara play/pause.
   - Return `<PlayerContext.Provider>` yang membungkus `children`.
   - Di dalam provider, render `<audio ref={audioRef} src={currentSong?.url} />` (hidden).

2. **`src/components/PlayerBar.jsx`**
   - Layout: Fixed di bawah layar (`bottom-0 fixed w-full h-24 bg-zinc-900`).
   - Gunakan `useContext(PlayerContext)`.
   - Tampilkan:
     - Info lagu (Judul/Artis) di kiri.
     - Tombol Play/Pause (tengah).
     - Volume Slider (kanan - optional/simple input range).
   - Jika `!currentSong`, return null (atau render bar kosong).

## ATURAN
- Gunakan Tailwind untuk styling bar agar terlihat modern.
- Pastikan logika `play()` dipanggil dengan `audioRef.current.play()`.