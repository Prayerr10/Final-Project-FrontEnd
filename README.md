# Spotify Clone - Final Project Front-End Development

Welcome to our **Spotify Clone**, a feature-rich music streaming web application built as the Final Project for the **Front-End Development** course. This project demonstrates our ability to build modern, interactive, and responsive web applications using React.

## 🎵 Features

### Music Playback
-   **Full Player Controls**: Play, Pause, Next, Previous, Shuffle, and Loop.
-   **Seek Bar**: Draggable progress bar to jump to any part of the song.
-   **Volume Control**: Adjust volume or mute/unmute.
-   **Persistent Player**: The player bar stays active while navigating across pages.

### Playlist Management
-   **Create Playlists**: Users can create custom playlists with a name, description, and cover image.
-   **Edit Playlists**: Add or remove songs from your playlists easily.
-   **Delete Playlists**: Remove playlists you no longer need.
-   **Playlist Details**: View playlist metadata and the list of songs.

### Liked Songs & Personalization
-   **Like System**: "Heart" your favorite songs to add them to your "Liked Songs" library.
-   **Smart Filtering**: The Liked Songs page only shows songs you've actually liked.
-   **Shuffle Play**: Play your liked songs in random order.
-   **Search & Sort**: Find songs in your library by Title or Artist, or sort them by Date Added.
-   **"Your Vibe"**: A smart badge that analyzes your liked songs and tells you your top genre!

### User Experience
-   **Responsive Design**: Works beautifully on desktops and smaller screens.
-   **Interactive UI**: Hover effects, smooth transitions, and glassmorphism styling.
-   **About Us & Surprise**: A dedicated team section with a special Christmas animation surprise!

---

## 🛠️ Tech Stack

-   **Frontend Framework**: [React](https://reactjs.org/) (Vite)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **Backend (Mock)**: [JSON Server](https://github.com/typicode/json-server)

---

## 📂 File Structure

Here is an overview of the project's file structure:

```
Final-Project-FrontEnd/
├── public/
│   └── assets/
│       └── songs/          # MP3 files
├── src/
│   ├── api/
│   │   └── api.js          # API functions (getSongs, getPlaylists, etc.)
│   ├── assets/
│   │   └── data.js         # Static data (categories, initial songs)
│   ├── components/
│   │   ├── AboutModal.jsx  # Team info & Surprise modal
│   │   ├── ChristmasAnimation.jsx # Special Christmas animation
│   │   ├── Navbar.jsx      # Top navigation (Search, etc.)
│   │   ├── PlayerBar.jsx   # Music player controls
│   │   ├── Sidebar.jsx     # Left sidebar navigation
│   │   ├── SongItem.jsx    # Individual song card component
│   │   └── TopBar.jsx      # User & Team icons
│   ├── context/
│   │   └── PlayerContext.jsx # Global state for audio & playback
│   ├── layout/
│   │   └── MainLayout.jsx  # Main page wrapper
│   ├── pages/
│   │   ├── CreatePlaylist.jsx
│   │   ├── Home.jsx
│   │   ├── Library.jsx
│   │   ├── LikedSongs.jsx
│   │   ├── PlaylistDetails.jsx
│   │   └── Search.jsx
│   ├── App.jsx             # Main App component & Routes
│   └── main.jsx            # Entry point
├── db.json                 # Mock database for playlists
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 How to Run the Program

Follow these steps to set up and run the project locally on your machine.

### 1. Prerequisites
Make sure you have **Node.js** installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).

### 2. Installation
Open your terminal (Command Prompt, PowerShell, or VS Code Terminal) and navigate to the project folder.

Run the following command to install all necessary dependencies (React, Tailwind, etc.):

```bash
npm install
```

### 3. Start the Backend (Mock Server)
We use `json-server` to simulate a backend database for storing playlists. You need to run this in a **separate terminal window**.

```bash
npx json-server db.json --port 3000
```
*Keep this terminal open.*

### 4. Start the Frontend
In your **original terminal window**, run the development server:

```bash
npm run dev
```

### 5. Open in Browser
Once the server starts, you will see a local URL (usually `http://localhost:5173`). Ctrl+Click it or open your browser and paste the address to view the app.

---

## 👥 Credits & Acknowledgements

This website was created by:

*   **Gerungan, Dave Jordy**
*   **Kaawoan, Prayer Yosua Immanuel**
*   **Munggilung, Farlen bernet**
*   **Jocom, Hulio Klose Bastian**

### Special Thanks
We would like to express our deepest gratitude to our lecturer:

**Sir Stenly Adam**

Thank you for teaching us from scratch (0) until we could implement this knowledge into building this website. Your guidance has been invaluable.

---
*Merry Christmas & Happy Coding!* 🎄🎅
