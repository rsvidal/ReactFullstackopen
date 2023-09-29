import React, { useState } from 'react'

// Componente Refresh que muestra un contador que se incrementa cada segundo
// En este caso se usa el hook useState para definir una variable de estado (counter) y una función para actualizarla (setCounter)
const Refresh = () => {

  // El hook useState se usa para definir una variable de estado (counter) y una función para actualizarla (setCounter)
  // Es la manera correcta de actualizar el estado de una variable y que se refresque el componente automaticamente en el navegador
  // Nota importante: Los hooks deben definirse en el nivel más alto del componente React, no dentro de funciones anidadas (Ej. dentro de un if o un bucle)
  const [ counter, setCounter ] = useState(0)

  setTimeout( () => setCounter(counter + 1), 1000 )
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
const Display = ( counter ) => {
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

export { Refresh, Increase, LeftRight }