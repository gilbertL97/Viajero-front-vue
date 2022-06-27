import axios, { AxiosInstance } from 'axios';
import { addAuthHeader } from '@/modules/auth/services/auth.service';
import { useAuthStore } from '@/modules/auth/store/auth.store';

const url = import.meta.env.VITE_BASE_URL as string;
const API: AxiosInstance = axios.create({
    baseURL: url, //'http://localhost:3001/viajero',
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
    withCredentials: false,
});

export default API;

API.interceptors.request.use((config) => {
    const store = useAuthStore();
    console.log(store.getToken);
    if (store.getToken != null) {
        addAuthHeader(store.getToken as string);
    }
    return config;
});

API.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        error = error.response
            ? error
            : {
                  response: {
                      data: {
                          message:
                              'Cors error,Check preflight request, there is not response from server',
                      },
                      statusText: 'Cors Errors , There no status text',
                  },
              };
        throw error;
    },
);
