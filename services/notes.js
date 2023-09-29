import axios from 'axios' // Librería axios para hacer peticiones HTTP

// const baseUrl = 'http://localhost:3002/notes' // URL de notas del servidor json-server
const baseUrl = 'http://localhost:3003/api/notes' // URL de notas del servidor creado con node en el proyecto 'backend'

// Nota: En este caso, en lugar de devolver directamente el objeto response, se devuelve unicamente response.data, que es lo unico atributo que se usará en el componente NotesUsingAxios
const getAllNotes = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data);
}

const create = newObject => axios.post(baseUrl, newObject)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

const deleteNote = (id) => axios.delete(`${baseUrl}/${id}`)

// Este módulo devuelve un objeto que tiene tres funciones: getAll, create y update
export default {
  getAll : getAllNotes, // Parte izquierda es como se expone este método fuera de este módulo, parte derecha es el nombre de la función dentro de este módulo
  create,
  update,
  delete : deleteNote }