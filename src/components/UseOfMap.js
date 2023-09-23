import React from 'react'

const UseOfMap = () => {

    const notes = [
      { 
        id: 1,
        content: 'HTML is easy',
        date: '2019-05-30T17:30:31.098Z',
        important: true
      },
      {
        id: 2,
        content: 'Browser can execute only Javascript',
        date: '2019-05-30T18:39:34.091Z',
        important: false
      },
      {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2019-05-30T19:20:14.298Z',
        important: true
      }
    ]
  
    return (
      <div>
        <h1>Map</h1>
        <p><b>Map function using note.id:</b></p>
        <ul>        
          {notes.map(note => <li key={note.id}>Id {note.id} - {note.content} {note.important ? '(Important)' : '(Not important)'}</li>)}
        </ul>
  
        <p><b>Map function using key:</b></p>
        <ul>
          {notes.map((note, key) => <li key={key}>Key {key} - Id {note.id} - {note.content} {note.important ? '(Important)' : '(Not important)'}</li>)}
        </ul>
  
        <p><b>Map usando el componente SimpleNote en lugar del elemento li</b> (Nota: El componente SimpleNote está definido en el fichero comonents/SimpleNote.js y ha sido importado en este fichero index.js):</p>
        <ul>
          {notes.map(note => (
            <SimpleNote note={note} />
          ))}
        </ul>
  
      </div>
    )
}

const SimpleNote = ({ note }) => {
  return <li key={note.id}>Id {note.id} - {note.content} {note.important ? '(Important)' : '(Not important)'}</li>
}

export {UseOfMap}