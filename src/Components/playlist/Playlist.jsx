import React from 'react';
import styles from './playlist.module.css';

export function Playlist(){
  console.dir(styles)
  return (
    <section>
      <h3>Playlist</h3>
      <div className={styles.container}></div>
      <aside>This will only show when submit button is clicked.</aside>
      <form className={styles.playlistForm}>
        <label htmlFor="playlist-name">Playlist Name</label>
        <input id='playlist-name' type="text" />
        <input type="submit" value='Create playlist'/>
      </form>
    </section>
  )
}