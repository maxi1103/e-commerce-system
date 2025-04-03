import axios from 'axios'

export const getAllProductos = () =>{
    const res = axios.get('http://127.0.0.1:8000/api/productos/')
    return res
}