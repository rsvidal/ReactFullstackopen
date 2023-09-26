import './index.css' // Fichero index.css en la carpeta src
import React from 'react'
import ReactDOM from 'react-dom'
import {Hello, Hello2} from './components/hello' // Fichero hellos.js en la carpeta components
import {Refresh, Increase, LeftRight} from './components/counter' 
import {UseOfMap} from './components/useOfMap' 
import {UseOfXHR, UseOfAxios} from './components/useOfAxios' 
import {Notes} from './components/notes' 
import {NotesUsingAxios} from './components/notesUsingAxios' 
/* IMPORTANTE: 
   a) Si se exportan componentes sueltos de un fichero (usando llaves), se deben importar con llaves
      'export {notes}' implica un 'import {notes}'
   b) Si se exporta un objeto completo (sin llaves), se debe importar sin llaves
      'export default {getAll, create, update}' implica un 'import myService'
      Y para usarlo hay que usar la notación de punto. Ej. myService.getAll() */

// Componente React que se define como una función JavaScript de flecha (ES6)
// Notas: Un componente React siempre empieza con mayúscula y debe contener un elemento raíz que englobe a todos los demás elementos (en este caso <div></div>)
const App = () => ( 
  <div>
    {/*
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
    <UseOfAxios /> */}  
    <NotesUsingAxios />    
  </div>
)

ReactDOM.render(<App />, document.getElementById('root')) 