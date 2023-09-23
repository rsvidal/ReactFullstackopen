import axios from 'axios' // Librería axios para hacer peticiones HTTP

const url = 'http://localhost:3002/notes'

// Componente que muestra como se puede hacer una petición HTTP usando XMLHttpRequest
// Nota: Es preferible usar Axios (ver componente UseOfAxios en este mismo fichero)
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
    xhttp.open('GET', url, true)
    xhttp.send()    
}
  
// Componente que muestra como se puede hacer una petición HTTP usando axios (muy similar a XMLHttpRequest, pero más sencilla)
const UseOfAxios = () => {
    
    axios.get(url).then(response => {
        console.log("Axios status:", response.status)
        console.log("Axios statusText:", response.statusText)
        console.log("Axios headers:", response.headers)
        console.log("Axios config:", response.config)
        console.log("Axios request:", response.request)
        console.log("Axios data:", response.data)
      })
  
    console.log("This sentence is executed before the response is received from the server")    
}

export {UseOfXHR, UseOfAxios}