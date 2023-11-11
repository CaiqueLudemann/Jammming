import { useState } from 'react';
import styles from './playlist.module.css';

export function Playlist(props){

  const userId = import.meta.env.VITE_SPOTIFY_USER_ID;
  const userSecret = import.meta.env.VITE_SPOTIFY_USER_SECRET;

  const spotifyID = '12151823656'

  const [playlistName, setPlaylistName] = useState("");

  async function createPlaylist(e){
    try {
      e.preventDefault();

      if (!playlistName.trim()) {
        console.log("Please enter a playlist name.");
        return;
      }

      const headers = {
      'Authorization': `Bearer ${userSecret} `,
      'Content-Type':'application/json'
    };

    const body = JSON.stringify({
      'name': playlistName,
      'description': 'New playlist description',
      'public': true
    });

    console.log(playlistName)
    console.log('Request Headers:', headers);
    console.log('Request Body:', body);

    const response = await fetch(`https://api.spotify.com/v1/users/${spotifyID}/playlists`, {
      method: 'POST',
      headers: headers,
      body: body
    });


      if (response.ok){
        const playlistData = await response.json();
        console.log("Playlist created successfully", playlistData);
      } else {
        console.log("Failed to create playlist", response.status, response.statusText)
      }

    } catch (error) {
      console.log(`Error creating playlist: ${error}`)
    }
    
  }
  

  return (
    <section>
      <h3>Playlist</h3>
      <div className={styles.container}>
        {props.selected.map(selectedTrack=>(
          <>
            <p className={styles.selectedTrack}>{selectedTrack}</p>
          </>
        ))}
      </div>
      
      <form className={styles.playlistForm}>
        <label htmlFor="playlist-name">Playlist Name</label>
        <input onChange={(e)=>setPlaylistName(e.target.value)} id='playlist-name' type="text" />
        <input onClick={(e)=>createPlaylist(e)} type="submit" value='Create playlist'/>
      </form>
    </section>
  )
}