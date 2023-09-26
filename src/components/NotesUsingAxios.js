import React, {useState, useEffect} from 'react'
import noteService from '../services/notes'
import Notification from './notification'

// Nota: Este componente se ha copiado del componente Notes y se ha modificado para invocar a axios para realizar peticiones HTTP 
const NotesUsingAxios = (props) => {

  // El hook useState (hook de estado) se usa para definir una variable de estado (notes) y una función para actualizarla (setNotes)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // El hook useEffect se ejecuta siempre que se renderiza el componente, por lo que se debe tener cuidado con el código que se incluye en el hook useEffect, pues puede provocar un bucle infinito
  // En este caso, al cargar la pagina se invoca al servidor para obtener las notas desde el backend y llama al método setNotes para actualizar la variable de estado notes  
  // Como la invocación al servidor se hace una única vez, no se produce un bucle infinito y además es asincrona, por lo que no bloquea la ejecución del resto del código
  //
  // En este caso, la aparición de mensajes en la consola será la siguiente:
  // 1. render 0 notes
  // 2. effect!
  // 3. promises fulfilled
  // 4. render 3 notes
  // 
  // ¿Porque se muestra el mensaje de render dos veces?
  // Como siempre, una llamada a una función de actualización de una variable de estado (en este caso 'notes' desencadena la re-renderización del componente. 
  // Como resultado, render 3 notes se imprime en la consola y las notas obtenidas del servidor se renderizan en la pantalla.

  /* Anulado. Se invoca al método getAll del servicio noteService para obtener las notas desde el backend
  useEffect(() => {
    console.log('effect!')
    axios
      .get('http://localhost:3002/notes')
      .then(response => {
        console.log('promises fulfilled')
        setNotes(response.data)
      })
  }, []) // Este segundo parametro es un array vacío, que indica que el efecto solo se ejecuta con la primera renderización del componente
  */

  useEffect(() => {
    console.log('effect!')
    noteService
      .getAll()
      .then(initialNotes => { // Nota: El nombre initialNotes es un nombre cualquiera, podría ser cualquier otro nombre
        console.log('promises fulfilled')
        setNotes(initialNotes)
      })
  }, []) // Este segundo parametro es un array vacío, que indica que el efecto solo se ejecuta con la primera renderización del componente

  console.log('render', notes.length, 'notes')

  /* Otra forma de escribir la función de efecto es la siguiente: 
  useEffect(() => {
    console.log('effect!')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    }

    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
  }, []) */

  // Evento que se ejecuta cada vez que el usuario escribe algo en el textbox de la nota y almacena su valor en la variable newNote
  const handleNoteChanged = (event) => {
    // console.log("Note has changed!", event.target.value)
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
      // id: notes.length + 1, // No es necesario incluir el id, pues el backend lo genera automaticamente
    }

    /* Anulado. Se invoca al método create del servicio noteService para añadir la nota en el backend
    axios
      .post('http://localhost:3002/notes', noteObject)
      .then(response => {
        console.log("Response when adding a new note:", response)
        setNotes(notes.concat(response.data)) // Incluir la nota en la lista de notas (con su correspondiente id)
        setNewNote('') // Inicializa el textbox de la nota    
      }) */

    noteService
      .create(noteObject)
      .then(response => {
        console.log("Response when adding a new note:", response)
        setNotes(notes.concat(response.data)) // Incluir la nota en la lista de notas (con su correspondiente id)
        setNewNote('') // Inicializa el textbox de la nota
      })
  }

  // notesToShow es la lista de notas que se va a mostrar en el navegador
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  // Función que se ejecuta cuando el usuario pulsa el botón de marcar/desmarcar una nota como importante
  const toggleImportanceOf = id => {

    console.log('Changing importance into ' + id + ' note ...')
    const note = notes.find(n => n.id === id)

    // Nota: El operador spread (...) se usa para crear una copia de un objeto JavaScript
    // Es importante comentar que no se modifica directamente el objeto note porque pertenece a la lista notes que es una variable de estado 
    // Y las variables de estado no se deben modificar directamente (siempre se debe crear una copia)
    const changedNote = { ...note, important: !note.important }
  
    /* Anulado. Se invoca al método update del servicio noteService para actualizar la nota en el backend
    axios.put(url, changedNote).then(response => {
      // Se actualiza la lista de notas con la nota que ha sido modificada (la que no ha sido modificada se mantiene igual)
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    }) */
    
    noteService
    .update(id, changedNote)
    .then(response => {
      // Se actualiza la lista de notas con la nota que ha sido modificada (la que no ha sido modificada se mantiene igual)
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
    .catch (error => { 
      Notification('the note ' + note.content + ' was already deleted from server') 
      setTimeout(() => {setErrorMessage(null) }, 5000)
    })  
  }

  // Función que se ejecuta cuando el usuario pulsa el botón de eliminar una nota
  const deleteNoteOf = id => {

    console.log('Delete ' + id + ' note ...')
    
    noteService
    .delete(id)
    .then(response => {      
      // Se actualiza la lista de notas con la nota que ha sido eliminada
      // setNotes(notes.filter(note => note.id !== id))      
      var result = notes.filter(note => note.id !== id)      
      setNotes(result)      
    })
    .catch (error => { 
      Notification('Error deleting the note ' + id + ' from server') 
      setTimeout(() => {setErrorMessage(null) }, 5000)
    })  
  }
  
  return (
    <div>
      <h1>Notes Using Axios</h1>
      <Notification message={errorMessage} />
      {/* Botón que indica si se muestran todas las notas o solo las importantes */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all' }</button>
      </div>

      <ul>
        {notesToShow.map((note, key) => (          
          <Note
            clave={key}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}            
            deleteNote={() => deleteNoteOf(note.id)}
          />  
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChanged} />
        <button type="submit">save</button>
      </form>       
    </div>
  )
}

const Note = ({ clave, note, toggleImportance, deleteNote }) => {
  
  const label = note.important ? 'make not important' : 'make important'
  console.log('Showing note in the list .,.', note)

  return (
    <li key={clave}>
      Id {note.id} - {note.content} {note.important ? '(Important)' : '(Not important)'}
      &nbsp;-&nbsp;
      <button onClick={toggleImportance}>{label}</button>
      &nbsp;-&nbsp;
      <button onClick={deleteNote}>X</button>
    </li>
  )  
}

export {NotesUsingAxios}