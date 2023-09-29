import axios from 'axios'

// const baseUrl = 'http://localhost:3002/notes' // URL de notas del servidor json-server
const baseUrl = 'http://localhost:3003/api/notes' // URL de notas del servidor creado con node en el proyecto 'backend'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }