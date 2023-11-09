import React from 'react';
import styles from './search.module.css';

export function Search(props){ 
  const baseUrl = 'https://api.spotify.com/v1';

  async function searchTracksByArtist(artistName, token){
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
  };

  //looks in spotify directory for artist by name
  async function fetchTracksByArtist(artistName) {
  try {
    const searchResult = await searchTracksByArtist(artistName, props.data.token);
    const tracks = searchResult.tracks.items;

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
}
  console.log("Search rendered")
  return (
    <section>
      <h3>Search Artist</h3>
      <input onChange={handleChange} placeholder='search artist name'/>
      <aside>This message only shows when an artist is not found.</aside>
      <input onClick={()=>fetchTracksByArtist(props.data.name)} type='submit' value={'Search song'}/>
    </section>
  )
};