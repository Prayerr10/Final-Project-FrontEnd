# 🚀 Cara Menjalankan Spotify Clone

## Menjalankan Project Lewat CMD (Command Prompt)

### Langkah 1: Buka Command Prompt (CMD)
1. Tekan `Windows + R` pada keyboard
2. Ketik `cmd` 
3. Tekan `Enter`

### Langkah 2: Masuk ke Folder Project
Ketik perintah ini di CMD:
```cmd
cd C:\Users\Asus\Final-Project-FrontEnd
```

### Langkah 3: Install Dependencies (Hanya Sekali)
**Catatan**: Langkah ini hanya perlu dilakukan sekali, atau jika ada dependency baru.

```cmd
npm install
```

Tunggu sampai proses selesai (biasanya 1-3 menit).

### Langkah 4: Jalankan Development Server
```cmd
npm run dev
```

Anda akan melihat output seperti ini:
```
VITE v7.2.4  ready in 523 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Langkah 5: Buka di Browser
Buka browser (Chrome, Firefox, Edge, dll) dan akses:
```
http://localhost:5173
```

---

## 🛑 Cara Menghentikan Server

Jika ingin stop development server:
1. Klik pada jendela CMD yang sedang running
2. Tekan `Ctrl + C` pada keyboard
3. Ketik `Y` lalu tekan `Enter`

---

## 📋 Perintah Cepat (Quick Commands)

### Menjalankan Project (Setelah Install)
```cmd
cd C:\Users\Asus\Final-Project-FrontEnd
npm run dev
```

### Install Dependencies Baru
```cmd
npm install <nama-package>
```

Contoh:
```cmd
npm install axios
```

### Build untuk Production
```cmd
npm run build
```

### Preview Production Build
```cmd
npm run preview
```

### Check Linting/Error
```cmd
npm run lint
```

---

## 🔧 Troubleshooting

### Problem: "npm is not recognized"
**Solusi**: Install Node.js terlebih dahulu dari https://nodejs.org/

### Problem: "Cannot find module"
**Solusi**: Jalankan `npm install` lagi

### Problem: "Port 5173 already in use"
**Solusi**: 
1. Stop server yang sedang running dengan `Ctrl + C`
2. Atau ubah port di `vite.config.js`

### Problem: PowerShell Execution Policy Error
**Solusi**: Gunakan CMD (bukan PowerShell) atau jalankan:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📁 Struktur Project

```
Final-Project-FrontEnd/
├── src/                    # Source code
│   ├── components/         # Komponen React
│   ├── pages/             # Halaman
│   ├── api/               # API services
│   ├── context/           # React Context
│   ├── App.jsx            # Main App
│   └── main.jsx           # Entry point
├── public/                # Static files
├── package.json           # Dependencies
└── vite.config.js         # Vite config
```

---

## 🎯 Workflow Development

### Pertama Kali Setup:
```cmd
cd C:\Users\Asus\Final-Project-FrontEnd
npm install
npm run dev
```

### Setiap Hari Kerja:
```cmd
cd C:\Users\Asus\Final-Project-FrontEnd
npm run dev
```

### Sebelum Push ke Git:
```cmd
npm run lint
npm run build
```

---

## 📝 Scripts Available

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

---

## 🌐 URLs

- **Development**: http://localhost:5173
- **Production Build Preview**: http://localhost:4173 (setelah `npm run preview`)

---

## 💡 Tips

1. **Jangan close CMD** saat development server running
2. **Hot Module Replacement (HMR)** aktif - perubahan code langsung terlihat di browser
3. **Save file** untuk trigger reload otomatis
4. **Check terminal** untuk error messages

---

## 📞 Bantuan

Jika ada masalah:
1. Check error message di CMD
2. Pastikan Node.js sudah terinstall: `node --version`
3. Pastikan npm sudah terinstall: `npm --version`
4. Coba `npm install` ulang
5. Restart CMD dan coba lagi

---

**Happy Coding! 🎉**
