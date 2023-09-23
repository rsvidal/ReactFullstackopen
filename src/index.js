import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import SimpleNote from './components/SimpleNote' // Fichero SimpleNote.js en la carpeta components
import Note from './components/Note' // Fichero Note.js en la carpeta components
import axios from 'axios' // Librería axios para hacer peticiones HTTP

// Componente React que se define como una función JavaScript de flecha (ES6)
// Notas: Un componente React siempre empieza con mayúscula y debe contener un elemento raíz que englobe a todos los demás elementos (en este caso <div></div>)
const App = () => ( 
  <div>
  
    <h1>Greetings from App!</h1>
    (*) Componente App definido en el fichero src/index.js
    <hr/>    
    <Hello name="Rafael San Vidal Hidalgo" age="50" />
    <hr/>
    <Hello name="Brais Omar Moreno Cidrás" age={50-10} />
    <hr/>
    <Hello2 name="Olga Diaz Romanillos" age="55" />
    <hr/>
    <Refresh />
    <hr/>
    <Increase />
    <hr/>
    <LeftRight />
    <hr/>
    <UseOfMap />
    <hr/>
    <Notes />
    <hr/>
    <UseOfXHR />    
    <UseOfAxios />     
    <NotesUsingAxios />    
  </div>
)

// Hello function. Esta embebida dentro del componente App
// El componente Hello es un componente React que se define como una función JavaScript de flecha (ES6)
// 
// Esta forma de escribir Javascript es usando JSX (muy similar a Thymeleaf, empleando elementos {})
// Aunque JSX se parece a HTML, en realidad es solo una sintaxis de JavaScript. el JSX devuelto por los componentes de React es compilado por Babel, que es un compilador de JavaScript gratuito y de código abierto y un conjunto de herramientas.
const Hello = (props) => {

  console.log("Hello {props.name}!")

  const now = new Date()
  const a = 10
  const b = 20

  // Función que calcula el año de nacimiento
  // Esta función bornYear() es una función JavaScript normal, no es un componente React y está definida dentro del componente Hello, que a su vez es otra función
  // Es decir, se pueden definir funciones dentro de otras funciones
  // Esta función se puede simplificar usando una función de flecha (ES6) como se muestra en el ejemplo de abajo
  // const bornYear = () => now.getFullYear() - props.age  
  const bornYear = () => {
    const yearNow = now.getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <h1>Hello</h1>
      <p>Hello {props.name} from Hello, you are {props.age} years old!</p>
      <p>So you were probably born in {bornYear()}</p>
      <p>it is {now.toString()}</p>
      <p>{a} plus {b} is {a+b}</p>
    </div>
  )
}

// Esta función es una copia de la función Hello
// En este caso no se pasa el parametro props (objecto con todos los argumentos, sino que se pasan directamente dos de sus atributos: name y age)
const Hello2 = ({name, age}) => {

  console.log("Hello2 {name}!")
  const now = new Date()
  const bornYear = () => now.getFullYear() - age  

  return (
    <div>
      <h1>Hello2</h1>
      <p>Hello {name} from Hello2, you are {age} years old!</p>
      <p>So you were probably born in {bornYear()}</p>
      <p>it is {now.toString()}</p>      
    </div>
  )
}

// Componente Refresh que muestra un contador que se incrementa cada segundo
// En este caso se usa el hook useState para definir una variable de estado (counter) y una función para actualizarla (setCounter)
const Refresh = () => {
  
  // El hook useState se usa para definir una variable de estado (counter) y una función para actualizarla (setCounter)  
  // Es la manera correcta de actualizar el estado de una variable y que se refresque el componente automaticamente en el navegador
  // Nota importante: Los hooks deben definirse en el nivel más alto del componente React, no dentro de funciones anidadas (Ej. dentro de un if o un bucle)
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  console.log('rendering ... Counter:', counter)

  return (
    <div>
      <div>Counter: {counter}</div>      
    </div>
  )
}

const Increase = () => {

  // El hook useState se usa para definir una variable de estado (counter) y una función para actualizarla (setCounter)  
  // Es la manera correcta de actualizar el estado de una variable y que se refresque el componente automaticamente en el navegador  
  const [ counter, setCounter ] = useState(0)

  // La variable handleClick está asignada a una referencia a función
  const handleClick = () => {
    console.log('clicked using handleClick function!')
  }

  // La variable ResetCounter está asignada a una referencia a función
  const ResetCounter = () => {
    console.log('clicked using ResetCounter function!')
    setCounter(0)
  }
  
  return (
    <div> 
      <h1>Counter</h1>     
      {/* En este caso, hemos pasado el valor de la variable counter al componente Display */}
      <Display counter={counter}/>
      <button onClick={handleClick}>Click</button>
      {/* En este caso, hemos definido una referencia a una función que llama a console.log */}
      <button onClick={() => console.log('clicked using embebbed function!')}>Click</button>
      {/* En este caso, hemos definido una referencia a una función que llama a la función del hook setCounter */}
      <button onClick={() => setCounter(counter+1)}>Increase counter</button>
      
      {/* ERROR. Se debe invocar siempre a una referencia a una función y no llamar a la función directamente.
          Si usamos una referencia a una función () => ..., entonces cuando el componente se renderiza, no se llama a ninguna función. Solo la referencia a la función de flecha se establece en el controlador de eventos.
          De esta forma, la llamada a la función ocurre unicamente cuando se hace click en el botón. */}
      <button onClick={console.log('clicked using embebbed function!')}>Click que no funciona</button>

      {/* ERROR. Se debe invocar siempre a una referencia a una función y no llamar a la función directamente.
      {/* <button onClick={setCounter(counter+1)}>Otro click que no funciona</button> */}

      {/* Reset counter llamando a una referencia a una función que a su vez contiene la llamada a la función del hook directamente, setCounter */}
      <button onClick={() => {
        console.log('clicked using embebbed function!')
        setCounter(0) }}>Reset counter</button>
      
      {/* Reset counter llamando a una referencia a una función registrada en la variable ReseteCounter */}
      <button onClick={ResetCounter}>Reset counter</button>

    </div>
  )
}

/* Importante: Este componente esta bien creado, pues está creado fuera del componente Increase.
   Si definieramos este componente dentro de otro componente (en este caso Increase), entonces cada vez que se renderizara el componente Increase, se volvería a crear el componente Display y se volvería a renderizar Display, lo que no es correcto.
   El programa funcionaría, pero con un menor rendimiento.
   Por lo tanto, ¡¡¡ nunca crear componentes dentro de otros componentes !!! */
const Display = ({counter}) => {
  return (
    <div>Counter: {counter}</div>
  )
}

const LeftRight = () => {

  // El hook useState se usa para definir una variable de estado (left) y una función para actualizarla (setLeft)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {

    // La consola de Google Chrome se parará en esta sentencia (solo cuando esté activa la consola de Google Chrome)
    // Realmente no hace falta añadir debugger en el código para depurar, ya que se puede depurar el programa desde la consola de Google Chrome) sin usar esta sentencia, pues se puede añadir puntos de interrupción en la propia consola de Google Chrome
    // debugger

    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <h1>Left and Right</h1>
      {left}&nbsp;-&nbsp;
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      &nbsp;-&nbsp;{right}
      <p>{allClicks.join(' ')}</p>
    </div>
  )
}

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

// Componente que muestra como se puede hacer una petición HTTP usando XMLHttpRequest
const UseOfXHR = () => {

  const xhttp = new XMLHttpRequest()

  // Evento que se ejecuta cuando se recibe una respuesta del servidor
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {      
      const notes = JSON.parse(this.responseText)
      console.log("Notes using XMLHttpRequest:", notes)
    }
  }

  // Invocar al servidor para obtener las notas
  xhttp.open('GET', 'http://localhost:3002/notes', true)
  xhttp.send()    
}

// Componente que muestra como se puede hacer una petición HTTP usando axios (muy similar a XMLHttpRequest, pero más sencilla)
const UseOfAxios = () => {
  
  axios.get('http://localhost:3002/notes').then(response => {
      console.log("Axios status:", response.status)
      console.log("Axios statusText:", response.statusText)
      console.log("Axios headers:", response.headers)
      console.log("Axios config:", response.config)
      console.log("Axios request:", response.request)
      console.log("Axios data:", response.data)
    })

  console.log("This sentence is executed before the response is received from the server")    
}

// Nota: Este componente se ha copiado del componente Notes y se ha modificado para invocar a axios para realizar peticiones HTTP 
const NotesUsingAxios = (props) => {

  // El hook useState (hook de estado) se usa para definir una variable de estado (notes) y una función para actualizarla (setNotes)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

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

  useEffect(() => {
    console.log('effect!')
    axios
      .get('http://localhost:3002/notes')
      .then(response => {
        console.log('promises fulfilled')
        setNotes(response.data)
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

    axios
      .post('http://localhost:3002/notes', noteObject)
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

    const url = `http://localhost:3002/notes/${id}`
    const note = notes.find(n => n.id === id)

    // Nota: El operador spread (...) se usa para crear una copia de un objeto JavaScript
    // Es importante comentar que no se modifica directamente el objeto note porque pertenece a la lista notes que es una variable de estado 
    // Y las variables de estado no se deben modificar directamente (siempre se debe crear una copia)
    const changedNote = { ...note, important: !note.important }
  
    axios.put(url, changedNote).then(response => {
      // Se actualiza la lista de notas con la nota que ha sido modificada (la que no ha sido modificada se mantiene igual)
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }
  
  return (
    <div>
      <h1>Notes Using Axios</h1>
      
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

ReactDOM.render(<App />, document.getElementById('root')) 