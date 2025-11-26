# The Architect

**Tugas Utama:** Menyiapkan fondasi project agar teman lain bisa masuk, dan membuat Layout statis (Sidebar).

## 1 Struktur Folder
Buat folder berikut di dalam `src/`:
- `components/`
- `pages/`
- `context/`
- `api/`

## 2 Layout Component (`src/components/Layout.jsx`)
Kamu bertanggung jawab membuat wrapper agar Sidebar selalu muncul di kiri, dan konten berubah di kanan.

**Requirement:**
- Gunakan Tailwind `flex h-screen bg-black text-white`.
- Bagian Kiri: Sidebar (Lebar fixed, misal `w-64`).
- Bagian Kanan: Content (Flex-1, overflow-y-auto).
- Bagian Bawah: Space kosong setinggi 90px (untuk tempat Player Bar punya Anggota 3 nanti).

## 3 Sidebar Component
Buat menu navigasi simpel ala Spotify.
- Gunakan `react-icons` (faHome, faSearch, faPlus).
- Gunakan `<Link>` dari `react-router-dom`.
- Menu: "Home", "Search", "Library".

## 4 Setup Routing (`src/App.jsx`)
Pasang routing dasar:
- `/` -> Menampilkan `Home.jsx` (Buat file dummy dulu).
- `/search` -> Menampilkan `Search.jsx`.
- `/library` -> Menampilkan `Library.jsx`.