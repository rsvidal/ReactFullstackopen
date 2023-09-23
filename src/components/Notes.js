import React, {useState} from 'react'

const Notes = (props) => {

  // El hook useState se usa para definir una variable de estado (notes) y una función para actualizarla (setNotes)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // Evento que se ejecuta cada vez que el usuario escribe algo en el textbox de la nota y almacena su valor en la variable newNote
  const handleNoteChanged = (event) => {
    console.log("Note has changed!", event.target.value)
    setNewNote(event.target.value)
  }

  // Evento que se ejecuta cuando el usuario pulsa el botón de guardar la nota. Añade la nota a la lista de notas y limpia el textbox
  const addNote = (event) => {

    event.preventDefault()
    console.log('adding note ...', event.target)

    // noteObject es un objeto JavaScript que contiene los datos de la nota que se va a añadir
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject)) // Incluir la nota en la lista de notas
    setNewNote('') // Inicializa el textbox de la nota    
  }

  // notesToShow es la lista de notas que se va a mostrar en el navegador
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
  
  return (
    <div>
      <h1>Notes</h1>
      
      {/* Botón que indica si se muestran todas las notas o solo las importantes */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all' }</button>
      </div>

      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChanged} /> 
        <button type="submit">save</button>
      </form>       
    </div>
  )
}

const Note = ({ clave, note, toggleImportance }) => {  
  console.log('Showing note in the list .,.', note)
  return (
    <li key={clave} class="note">
      Id {note.id} - {note.content} {note.important ? '(Important)' : '(Not important)'}      
    </li>
  )  
}

export {Notes};