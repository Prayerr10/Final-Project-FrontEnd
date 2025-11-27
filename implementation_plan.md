# Implementation Plan - Fix Assets & Player Logic

## Goal
Fix broken audio/images by switching to local assets, implement volume control, and fix playback reliability.

## Proposed Changes

### Database
#### [MODIFY] [db.json](file:///c:/Users/Dave%20Jordy/Final-Project-FrontEnd/db.json)
- Update all `url` fields to `/assets/songs/songX.mp3`
- Update all `image` fields to `/assets/images/imgX.jpg`

### Player Logic
#### [MODIFY] [PlayerContext.jsx](file:///c:/Users/Dave%20Jordy/Final-Project-FrontEnd/src/context/PlayerContext.jsx)
- Add `volume` state and `setVolume` function.
- Add error handling for `play()` promise to catch `AbortError`.
- Ensure `audioRef.current.volume` is updated when state changes.

#### [MODIFY] [PlayerBar.jsx](file:///c:/Users/Dave%20Jordy/Final-Project-FrontEnd/src/components/PlayerBar.jsx)
- Add volume slider input.
- Connect slider to `setVolume` from context.

### UI Fixes
#### [MODIFY] [Home.jsx](file:///c:/Users/Dave%20Jordy/Final-Project-FrontEnd/src/pages/Home.jsx)
- Verify `playPlaylist` click handler.

## Verification Plan

### Manual Verification
1. **Assets**: User will need to place files in `public/assets/songs` and `public/assets/images`.
2. **Playback**: Click a song -> Should play without console errors.
3. **Volume**: Drag volume slider -> Audio volume should change.
4. **Playlist**: Click "Night Drive" play button -> Should start playing the playlist.
