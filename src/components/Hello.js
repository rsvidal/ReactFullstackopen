import React from 'react'

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
      <p>Hello { props.name } from Hello, you are { props.age } years old!</p>
      <p>So you were probably born in { bornYear() }</p>
      <p>it is { now.toString() }</p>
      <p>{ a } plus { b } is { a+b }</p>
    </div>
  )
}

// Esta función es una copia de la función Hello
// En este caso no se pasa el parametro props (objecto con todos los argumentos, sino que se pasan directamente dos de sus atributos: name y age)
const Hello2 = ({ name, age }) => {

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

export { Hello, Hello2 };