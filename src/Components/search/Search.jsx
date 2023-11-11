import { useState } from 'react';
import styles from './search.module.css';

export function Search(props){ 
  const baseUrl = 'https://api.spotify.com/v1';
  const [errorMessage, setErrorMessage] = useState("");

  async function searchTracksByArtist(artistName, token){

    if (artistName && token) {
      const query = `q=${encodeURIComponent(`artist:${artistName}`)}`;
    const type = 'type=track';

    const searchUrl = `${baseUrl}/search?${query}&${type}`;

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    const data = await response.json();
    return data;
    }
  }

  //looks in spotify directory for artist by name
  async function fetchTracksByArtist(artistName) {
  try {
    props.setResults([]);
    const searchResult = await searchTracksByArtist(artistName, props.data.token);
    const tracks = searchResult?.tracks?.items;

    if(!tracks) throw new Error('No tracks found.');
    if (tracks.length === 0) {
      setErrorMessage('Artist or band not found in directory.');
    } else {
      setErrorMessage('');
    }

    // Process and display the tracks
    for (const track of tracks) {
      let trackName = track.name;
      props.setResults((prevResults)=>
        [...prevResults,
        trackName]
      )
    
      // console.log(`Track Name: ${track.name}`);
      // console.log(`Artist: ${track.artists[0].name}`);
      // console.log(`Album: ${track.album.name}`);
      // console.log('---');
    }
  } catch (error) {
    console.error('Error:', error);
  }

}



// Call the main function with the artist name
// fetchTracksByArtist();

//tracks name input for change
function handleChange(e){
  let name = e.target.value;
  props.setName(name);
  console.log(name)
}

  return (
    <section className={styles.search}>
      <h3>Search Artist</h3>
      
      <input onChange={handleChange} placeholder='filter by band or artist'/>
      {errorMessage && <aside>{errorMessage}</aside>}
      <input onClick={()=>fetchTracksByArtist(props.data.name)} type='submit' value={'Search Directory'}/>
    </section>
  )
}