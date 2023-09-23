import React from 'react'

const SimpleNote = ({ note }) => {
  return <li key={note.id}>Id {note.id} - {note.content} {note.important ? '(Important)' : '(Not important)'}</li>
}

export default SimpleNote