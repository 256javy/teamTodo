import { useState } from 'react';
import clienteAxios from "../api/clienteAxios";

const User = ({ userName, id }) => {

  return (
    <article className="user">
      <h2 className="user__name">{userName}</h2>
        
      </article>
  )
}


export default User