import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { addAuthHeader } from '@/modules/auth/services/auth.service';
import API from '@/service/api';
import { Plans } from '../types/typePlains';
import { useAuthStore } from '@/modules/auth/store/auth.store';
const store = useAuthStore();

export async function getPlans(): Promise<AxiosResponse<Plans[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/coverage',
    };
    addAuthHeader(store.getToken as string);
    return await API.request<Plans[]>(config);
}
export async function getPlain(id: number): Promise<AxiosResponse<Plans>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/coverage/' + id,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<Plans>(config);
}

export async function deletePlans(id: number): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: '/coverage/' + id,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<void>(config);
}

export async function editPlans(Plans: Plans): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: '/coverage/' + Plans.id,
        data: Plans,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<void>(config);
}
export async function addPlans(Plans: Plans): Promise<AxiosResponse<Plans>> {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/coverage',
        data: Plans,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<Plans>(config);
}
