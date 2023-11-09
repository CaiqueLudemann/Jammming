import React, {useState} from 'react';

export function Track() {
  
  return (
    <>
      <h1> track name </h1>
      <button onClick={handleClick}>
        {isClicked?'-':'+'}
      </button>
    </>
  )
};