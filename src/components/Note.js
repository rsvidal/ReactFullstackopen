import React from 'react'

const Note = ({ clave, note, toggleImportance }) => {
  
  const label = note.important ? 'make not important' : 'make important'

  console.log('Showing note in the list .,.', note)

  return (
    <li key={clave}>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )  
}

export default Note