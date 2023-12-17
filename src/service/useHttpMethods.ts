import { Payload } from '@/common/types/generic.type';
import API from './api';

export default function useHttpMethods() {
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
        patch,
        post,
        put,
        deleteOne,
    };
}
