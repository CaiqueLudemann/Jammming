import React from "react";
import styles from './app.module.css';
import {Search} from "../search/Search";
import {Results} from "../results/Results";
import {Playlist} from "../playlist/Playlist";

export function App(){
  return (
    <article className={styles.app}>
      <Search/>
      <Results/>
      <Playlist/>
    </article>
  )
};