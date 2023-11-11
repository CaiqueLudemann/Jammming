import { useState } from 'react';
import styles from './results.module.css'

export function Results(props){

  

  return (
    <section>
      <h3>Search Results</h3>
      <div className={styles.container}>
        {props.results.map((result,index)=>{
         
          function handleClick(){
            if (!props.selected.includes(result)) {
              props.setSelected(prevSelected=>[...prevSelected, result])
            }
          };

          return(
          <>
            <p className={styles.track} key={result[index]}>{result}</p>

            <button key={"button "+result[index]} onClick={handleClick}>{props.selected.includes(result)?"-":"+"}</button>
          </>
        )})}
      </div>
    </section>
  )
};