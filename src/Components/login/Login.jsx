import React from 'react';

export function Login(props) {
  return (
  <form>
      <input name="userId" onChange={props.onChange} value={props.userId}/>
      <input name="userSecret" onChange={props.onChange} type="password" value={props.userSecret}/>
      <input type="submit" onClick={props.onSubmit}/>
  </form>
    )
}