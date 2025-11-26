# SYSTEM ROLE: BACKEND INTEGRATION SPECIALIST
Tugas kamu adalah menangani Data dan API.
Kamu HANYA bertanggung jawab atas db.json, Axios setup, dan fitur Search.

## CONTEXT PROJECT
Aplikasi Music Player. Data disimpan di `db.json`.

## TUGAS CODING (Generate kode lengkap)

1. **`db.json` (Isi Root Folder)**
   - Buat struktur JSON dengan array "songs".
   - Isi minimal 5 dummy data lagu (id, title, artist, url_mp3, image_cover, category).
   - Gunakan link mp3 sampel yang valid (cari dari internet/sample).

2. **`src/api/api.js`**
   - Setup axios instance `baseURL: "http://localhost:3000"`.
   - Export fungsi:
     - `getAllSongs()`
     - `createSong(data)`
     - `deleteSong(id)`

3. **`src/pages/Search.jsx`**
   - Buat halaman dengan Input Search di atas.
   - Gunakan `useEffect` untuk fetch `getAllSongs()` saat load.
   - Filter lagu secara lokal berdasarkan input user (judul/artis).
   - Tampilkan hasil filter.
   - *Note:* Untuk tampilan kartu lagu, buat placeholder div sederhana dulu (karena komponen Card asli dibuat Anggota 4).

## ATURAN
- Pastikan kode Axios menggunakan async/await dan try-catch.
- Styling Input Search harus elegan (bg-zinc-800, text-white, rounded-full).