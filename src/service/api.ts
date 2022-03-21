import axios, { AxiosInstance } from 'axios'

const url=import.meta.env.VITE_BASE_URL as string ;
const API: AxiosInstance = axios.create({
  baseURL: url, 
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: false,
})


export default API