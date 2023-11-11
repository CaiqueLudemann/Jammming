import { useState, useEffect } from "react";
import { Search } from "../search/Search"; //inserir nome de música
import { Results } from "../results/Results"; //ver resultados retornados pelo Spotify
import { Playlist } from "../playlist/Playlist";
//visualizar música individualmente & selecioná-la
import styles from './app.module.css';
import { SpotifyAPI } from "./api";


//Objetivo do app: 
//  1. buscar, por título, músicas na diretoria do Spotify.
//  2. selecionar música para adicionar à playlist.
//  3. criar playlist com nome personalizado. 

export function App() {

  //returned search results
  const [results, setResults] = useState([]);
  // selected tracks to be added to playlist
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log(SpotifyAPI.wasRedirected(),SpotifyAPI.isLoggedIn())
    if(SpotifyAPI.wasRedirected())
      return SpotifyAPI.saveAccessToken();
    if (!SpotifyAPI.isLoggedIn()) 
      return SpotifyAPI.redirectToSpotifyLogin();
  }, []);

  return (
    <div className={styles.app}>
      <div>
        <Search
          setName={() => {}} //gets artist's name
          setSelected={setSelected}
          setResults={setResults} //sets the search results
          data={{
            name: name,
            token: "",
            id: "",
            secret: "",
            results: results,
            selected: selected,
          }} />
        <Results selected={selected} setSelected={setSelected} results={results} />
      </div>

      <Playlist selected={selected} />

    </div>

  );
}