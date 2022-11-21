import { AxiosResponse, AxiosRequestConfig } from 'axios';
import API from '@/service/api';
import { Plans } from '../types/plains.types';

export async function getPlans(): Promise<AxiosResponse<Plans[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/coverage',
    };
    return await API.request<Plans[]>(config);
}
export async function getPlansActive(): Promise<AxiosResponse<Plans[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/coverage/active',
    };
    return await API.request<Plans[]>(config);
}
export async function getPlain(id: number): Promise<AxiosResponse<Plans>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/coverage/' + id,
    };
    return await API.request<Plans>(config);
}

export async function deletePlans(id: number): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: '/coverage/' + id,
    };
    return await API.request<void>(config);
}

export async function editPlans(Plans: Plans): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: '/coverage/' + Plans.id,
        data: Plans,
    };
    return await API.request<void>(config);
}
export async function addPlans(Plans: Plans): Promise<AxiosResponse<Plans>> {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/coverage',
        data: Plans,
    };
    console.log(config.headers);
    return await API.request<Plans>(config);
}
