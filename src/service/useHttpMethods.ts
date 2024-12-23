import { Payload } from '@/common/types/generic.type';
import API from './api';
import { useAuthStore } from '@/modules/auth/store/auth.store.c';
import useAuth from '@/modules/auth/composable/useAuth';
import { AxiosError, AxiosRequestConfig } from 'axios';
// import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { addToken } from '@/intercerptors/request.interceptors/addTokenRequestInterceptor';
import { resendRefreshTokenIfExpire } from '@/intercerptors/response.interceptors/resendRefreshToken';

type AxiosRequestConfigRetry = AxiosRequestConfig & { _retry?: boolean }; //?extiendo la clase para agregarle una propiedad para saber si se reintento
export default function useHttpMethods() {
    const { acces_token } = storeToRefs(useAuthStore());
    // const router = useRouter();
    const { postRfresh } = useAuth();
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
    API.interceptors.request.use((config) => addToken(config, acces_token.value));
    API.interceptors.response.use(
        (res) => {
            return res;
        },
        async (error: AxiosError) => resendRefreshTokenIfExpire(error)
    );

    return {
        get,
        patch,
        post,
        put,
        deleteOne,
    };
}
