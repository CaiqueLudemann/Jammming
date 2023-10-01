import React from 'react';
import styles from './search.module.css';

export function Search(){
  return (
    <section>
      <h3>Search</h3>
      <input placeholder='search by song name'/>
      <aside>This message only shows when a song is not found.</aside>
      <input type='submit' value={'Search song'}/>
    </section>
  )
};