import axios, { AxiosInstance } from 'axios';
const url = import.meta.env.VITE_BASE_URL as string;
const API: AxiosInstance = axios.create({
    baseURL: url, //'http://localhost:3001/viajero',
    headers: { 'Content-Type': 'application/json' },
    timeout: 9000,
    withCredentials: false,
});

export default API;
