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
    const data = new FormData();
    data.append('daily', String(Plans.daily));
    data.append('name', String(Plans.name));
    data.append('high_risk', String(Plans.high_risk));
    data.append('isActive', String(Plans.isActive));
    data.append('price', String(Plans.price));
    data.append('number_of_days', String(Plans.number_of_days));
    data.append('config_string', String(Plans.config_string));
    data.append('tablePdf', Plans.tablePdf!);
    const config: AxiosRequestConfig = {
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'PATCH',
        url: '/coverage/' + Plans.id,
        data: data,
    };
    return await API.request<void>(config);
}
export async function addPlans(Plans: Plans): Promise<AxiosResponse<Plans>> {
    const data = new FormData();
    /* const keys = Object.keys(Plans);
    keys.map((key) => {
        Plans[key];
    });*/
    data.append('daily', String(Plans.daily));
    data.append('name', String(Plans.name));
    data.append('high_risk', String(Plans.high_risk));
    data.append('isActive', String(Plans.isActive));
    data.append('price', String(Plans.price));
    data.append('number_of_days', String(Plans.number_of_days));
    data.append('config_string', String(Plans.config_string));
    data.append('tablePdf', Plans.tablePdf!);
    const config: AxiosRequestConfig = {
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'POST',
        url: '/coverage',
        data: data,
    };
    return await API.request<Plans>(config);
}
