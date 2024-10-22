import { Payload } from '@/common/types/generic.type';
import API from './api';
import { useAuthStore } from '@/modules/auth/store/auth.store.c';
import refreshTokens from '@/modules/auth/composable/useRefreshTokenService';
import { AxiosError, AxiosRequestConfig } from 'axios';
// import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { addToken } from '@/intercerptors/request.interceptors/addTokenRequestInterceptor';

type AxiosRequestConfigRetry = AxiosRequestConfig & { _retry?: boolean }; //?extiendo la clase para agregarle una propiedad para saber si se reintento
export default function useHttpMethods() {
    const { logout } = useAuthStore();
    const { acces_token } = storeToRefs(useAuthStore());
    // const router = useRouter();
    const { postRfresh } = refreshTokens();
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

    const post = async (path: string, payload?: Payload) => {
        return await API.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload,
        });

        // Devuelve la respuesta en caso de éxito
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
    // const redirectLogin = () => {
    //     logout();
    //     router.push({ name: 'login' });
    // };
    API.interceptors.request.use((config) => addToken(config,acces_token.value));
    API.interceptors.response.use(
        (res) => {
            return res;
        },
        async (error: AxiosError) => {
            const originalConfig: AxiosRequestConfigRetry = error.config;
            console.log(originalConfig.url?.includes('/auth/'));
            //que no me vuelva hcer una peticion a ningun endpoin t de auth
            if (error.response && !originalConfig.url?.includes('/auth/')) {
                if (error.response.status == 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    await postRfresh().catch(() => logout());
                    return API(originalConfig);
                }
                // redirectLogin();
            }
            throw error;
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
