import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { Payload } from '@/common/types/generic.type';
import type { Init } from './http';
import init from './init';

export class Http {
    private service: AxiosInstance;
    constructor(init: Init) {
        this.defaultInit();
        const service = axios.create({
            headers: init.customHeaders,
            params: init.customParams,
            baseURL: init.baseURL,
            withCredentials: init.withCredentials,
        });
        service.interceptors.response.use(init.handleSuccess, init.handleError);
        this.service = service;
    }

    defaultInit() {
        init.customHeaders = init.customHeaders !== undefined ? init.customHeaders : {};
        init.customParams = init.customParams !== undefined ? init.customParams : {};
        init.baseURL = init.baseURL !== undefined ? init.baseURL : 'http://localhost';
        init.withCredentials =
            init.withCredentials !== undefined ? init.withCredentials : false;
        init.handleSuccess =
            init.handleSuccess !== undefined
                ? init.handleSuccess
                : this.defaultHandleSuccess;
        init.handleError =
            init.handleError !== undefined ? init.handleError : this.defaultHandleError;
    }

    defaultHandleSuccess(response: AxiosResponse) {
        return Promise.resolve(response);
    }

    defaultHandleError(error: AxiosError) {
        return Promise.reject(error);
    }

    get(path: string, query?: any) {
        let finalUrl = path;
        if (query !== undefined) {
            const params = new URLSearchParams();
            Object.keys(query).forEach((key) => {
                if (query[key] !== undefined) {
                    if (Array.isArray(query[key])) {
                        (query[key] as any[]).forEach((item) => params.append(key, item));
                    } else if (typeof query[key] === 'object') {
                        this.assignObjectValues([key], query[key], params);
                    } else {
                        // @ts-ignore
                        params.append(key, query[key]);
                    }
                }
            });
            finalUrl += `?${params.toString()}`;
        }
        return this.service.request({
            method: 'GET',
            url: finalUrl,
            responseType: 'json',
            params: query,
        });
    }

    patch(path: string, payload: Payload) {
        return this.service.request({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload,
        });
    }

    post(path: string, payload?: Payload) {
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload,
        });
    }

    put(path: string, payload: Payload) {
        return this.service.request({
            method: 'PUT',
            url: path,
            responseType: 'json',
            data: payload,
        });
    }

    delete(path: string) {
        return this.service.request({
            method: 'DELETE',
            url: path,
            responseType: 'json',
        });
    }
    private assignObjectValues(path: string[], object: any, params: URLSearchParams) {
        Object.keys(object).forEach((key) => {
            if (typeof object[key] === 'object')
                this.assignObjectValues(path.concat(key), object[key], params);
            else if (object[key] !== '')
                params.append(path.join('.').concat('.' + key), object[key]);
        });
    }
}

export default new Http(init);
