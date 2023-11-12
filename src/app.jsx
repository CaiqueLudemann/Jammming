import { useState, useEffect } from "react";

import { SpotifyAPI } from "./api";
import styles from './app.module.css';
import { Search } from "./components/search/search";
import { Tracks } from "./components/tracks/tracks";
import { Welcome } from "./components/welcome/welcome";

export function App() {
  const [allTracks, setAllTracks] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  useEffect(() => SpotifyAPI.authenticate(), []);

  function addTrackToPlaylist(track) {
    if (playlistTracks.some(pt => pt.id === track.id)) return;
    setPlaylistTracks([...playlistTracks, track]);
  }

  function removeTrackFromPlaylist(track) {
    setPlaylistTracks(playlistTracks.filter(pt => pt.id !== track.id));
  }

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <Welcome />
        <Search onSearch={async value => setAllTracks(await SpotifyAPI.getTracksByArtist(value))} />
        <Tracks
          tracks={allTracks}
          customIcon="➕"
          onTrackClick={addTrackToPlaylist}
        />
      </div>
      <div className={styles.content}>
        <h2>Your Playlist</h2>
        <Tracks
          tracks={playlistTracks}
          customIcon="➖"
          onTrackClick={removeTrackFromPlaylist}
        />
        <input onChange={(e)=>setPlaylistName(e.target.value)} type="text" value={playlistName} />
        <button onClick={()=>SpotifyAPI.createPlaylist(playlistName, playlistTracks)}>
          Save Playlist
        </button>
      </div>
    </div>
  );
}