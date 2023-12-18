import { Payload } from '@/common/types/generic.type';
import API from './api';

export default function useHttpMethods() {
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
    return {
        get,
        patch,
        post,
        put,
        deleteOne,
    };
}
