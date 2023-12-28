import { Payload } from '@/common/types/generic.type';
import API from './api';
import { useAuthStore } from '@/modules/auth/store/auth.store.c';
import { refreshTokens } from '@/modules/auth/service/service.auth';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { useRouter } from 'vue-router';

type AxiosRequestConfigRetry = AxiosRequestConfig & { _retry?: boolean }; //?extiendo la clase para agregarle una propiedad para saber si se reintento
export default function useHttpMethods() {
    const { acces_token, logout } = useAuthStore();
    const router = useRouter();
    const get = (path: string, query?: any) => {
        return API.request({
            method: 'GET',
            url: path,
            responseType: 'json',
            params: query,
        });
    };
    const patch = (path: string, payload: Payload) => {
        return API.request({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload,
        });
    };

    const post = (path: string, payload?: Payload) => {
        return API.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload,
        });
    };

    const put = (path: string, payload: Payload) => {
        return API.request({
            method: 'PUT',
            url: path,
            responseType: 'json',
            data: payload,
        });
    };

    const deleteOne = (path: string) => {
        return API.request({
            method: 'DELETE',
            url: path,
            responseType: 'json',
        });
    };
    const redirectLogin = () => {
        logout();
        router.push({ name: 'login' });
    };
    API.interceptors.request.use((config) => {
        if (acces_token) {
            config.headers!.Authorization = `Bearer ${acces_token}`;
        }
        return config;
    });
    API.interceptors.response.use(
        (res) => {
            return res;
        },
        (error: AxiosError) => {
            const originalConfig: AxiosRequestConfigRetry = error.config;

            // error = error.response
            //     ? error
            //     : {
            //           response: {
            //               data: {
            //                   message:
            //                       'Cors error,Check preflight request, there is not response from server',
            //               },
            //               statusText: 'Cors Errors , There no status text',
            //           },
            //       };

            if (error.response && originalConfig.url !== '/auth/login') {
                console.log(originalConfig._retry);
                if (error.response.status == 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    console.log(error.response)
                    console.log(originalConfig)
                    try {
                        refreshTokens();
                        return API(originalConfig);
                    } catch (error) {}
                }
                redirectLogin();
            }
        },
    );

    return {
        get,
        patch,
        post,
        put,
        deleteOne,
    };
}
