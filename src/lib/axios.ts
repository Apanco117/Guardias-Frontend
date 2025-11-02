import axios from "axios";

//. ->  Crear instancia de axios
console.log('VITE_API_URL leída:', import.meta.env.VITE_API_URL);
const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL
})

export default api