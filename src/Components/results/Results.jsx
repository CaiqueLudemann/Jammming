import React from 'react';
import styles from './results.module.css'

export function Results(){
  return (
    <section>
      <h3>Search Results</h3>
      <div className={styles.container}></div>
      <aside>This message only shows when song is added to playlist.</aside>
      <input type="submit" value={'Add to playlist'}/>
    </section>
  )
};