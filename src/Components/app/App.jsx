import React, {useState} from "react";
import styles from './app.module.css';
import {Search} from "../search/Search";
import {Results} from "../results/Results";
import {Playlist} from "../playlist/Playlist";
import { Track } from "../track/Track";

export function App(){
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [access, setAccess] = useState(false);
  function handleLoginChange({target}){
    setLoginData(prevLoginData => ({
      ...prevLoginData,
      [target.name]: target.value
    }))
  }
  function handleLoginSubmit(event){
    event.preventDefault();
    if (loginData.username == 'caique' && loginData.password == 'amorebeca') {
      setAccess(!access)
    } else {
      alert("Insira usuário e senha válidos.")
    }
  }
  console.log("username: "+loginData.username, "password: "+loginData.password)
  return (
    <>
    
    
    {access ? (<article className={styles.app}>
      <Search/>
      <Results/>
      <Playlist/>
    </article>)
    :
    (<form onSubmit={handleLoginSubmit}>
      <input name="username" onChange={handleLoginChange} value={loginData.username}/>
      <input name="password" onChange={handleLoginChange} type="password" value={loginData.password}/>
      <input type="submit"/>
    </form>)}
    
    </>
    
  )
};