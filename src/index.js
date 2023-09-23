import React from 'react'
import ReactDOM from 'react-dom'
import {Hello, Hello2} from './components/Hello' // Fichero hellos.js en la carpeta components
import {Refresh, Increase, LeftRight} from './components/Counter' 
import UseOfMap from './components/UseOfMap' 
import {UseOfXHR, UseOfAxios} from './components/Axios' 
import {Notes} from './components/Notes' 
import NotesUsingAxios from './components/NotesUsingAxios' 

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

ReactDOM.render(<App />, document.getElementById('root')) 