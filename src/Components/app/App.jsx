import React, {useState, useEffect} from "react";
import {Search} from "../search/Search"; //inserir nome de música
import {Results} from "../results/Results"; //ver resultados retornados pelo Spotify
import {Playlist} from "../playlist/Playlist"; 
import { Track } from "../track/Track"; //visualizar música individualmente & selecioná-la
import styles from './app.module.css';



//Objetivo do app: 
//  1. buscar, por título, músicas na diretoria do Spotify.
//  2. selecionar música para adicionar à playlist.
//  3. criar playlist com nome personalizado. 

export function App(){

  const userId = import.meta.env.VITE_SPOTIFY_USER_ID;
  const userSecret = import.meta.env.VITE_SPOTIFY_USER_SECRET;
  
  const [accessToken, setAccessToken] = useState(null); // token de acesso.
  const [timer, setTimer] = useState(null); // tempo de validade do token.

  //artist name
  const [name, setName] = useState('');

  //returned search results
  const [results, setResults] = useState([]);
  // selected tracks to be added to playlist
  const [selected, setSelected] = useState([]);
  
  //Periodicamente reseta valor do token de acesso. 
  useEffect(()=>{  
    setInterval(()=> { 
    if (accessToken){
      setAccessToken(null);
    };
  },timer);
  }, [timer])
  
  // recebe token de acesso & seu tempo de validade. Roda sempre que token de acesso tiver seu valor alterado.
  useEffect(()=>{
      if (!accessToken) {
        fetch("https://accounts.spotify.com/api/token",
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${userId}&client_secret=${userSecret}`
      }
      )
      .then(res=>{
          if (res.ok) {return res.json()};
          if (!res.ok) {throw new Error('Server said NOT ok!')}
      })
      .then(accessObj => {
        if (accessObj.access_token) {
          setAccessToken(accessObj.access_token) // define valor do token
          setTimer(accessObj.expires_in*100) // define validade do token
        } else {
          setAccessToken(null);
        }
      })
      .catch(error=>console.log(error))
      }
  }, [accessToken]); 
  
  console.log("App rendered")
  return (
    <>
    
      <Search setName={setName} //gets artist's name
      setSelected={setSelected}
      setResults={setResults} //sets the search results
      data={{
        name: name,
        token:accessToken,
        id: userId,
        secret: userSecret,
        results: results,
        selected: selected,
      }}/>
      <Results selected={selected} setSelected={setSelected} results={results} song={<Track/>}/>
      <Playlist selected={selected}/>
    
    </>
    
  )
};