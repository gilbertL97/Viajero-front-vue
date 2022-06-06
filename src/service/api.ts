import axios, { AxiosInstance } from 'axios';
import { addAuthHeader } from '@/modules/auth/services/auth.service';
import { useAuthStore } from '@/modules/auth/store/auth.store';
const store = useAuthStore();

const url = import.meta.env.VITE_BASE_URL as string;
const API: AxiosInstance = axios.create({
    baseURL: url, //'http://localhost:3001/viajero',
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
    withCredentials: false,
});

export default API;

API.interceptors.request.use((config) => {
    if (store.isloggedIn) {
        addAuthHeader(store.getToken as string);
    }
    console.log(store.getToken);
    return config;
});
/*
const respInt = axios_vue.interceptors.response.use(
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
);*/
