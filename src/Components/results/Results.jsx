import { useState } from 'react';
import styles from './results.module.css'

export function Results(props){

  return (
    <section>
      <h3>Search Results</h3>
      <div className={styles.container}>
        {props.results.map((result,index)=>{
         
          return(
          <>
            <p className={styles.track} key={result[index]}>{result}</p>
            <button key={"button "+result[index]} onClick={()=>props.setSelected(prevSelected=>[...prevSelected, result])}>{props.selected.includes(result)?"-":"+"}</button>
          </>
        )})}
      </div>

      <input type="submit" value={'Add to playlist'}/>
    </section>
  )
};