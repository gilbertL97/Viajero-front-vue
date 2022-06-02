import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { addAuthHeader } from '@/modules/auth/services/auth.service';
import API from '@/service/api';
import { Contractor } from '../types/modeltypes';
import { useAuthStore } from '@/modules/auth/store/auth.store';
const store = useAuthStore();

export async function getContractors(): Promise<AxiosResponse<Contractor[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/contractor',
    };
    addAuthHeader(store.getToken as string);
    return await API.request<Contractor[]>(config);
}
export async function getContractor(id: number): Promise<AxiosResponse<Contractor>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/contractor/' + id,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<Contractor>(config);
}

export async function deleteContractors(id: number): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: '/contractor/' + id,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<void>(config);
}

export async function editContractors(
    Contractor: Contractor,
): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: '/contractor/' + Contractor.id,
        data: Contractor,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<void>(config);
}
export async function addContractors(
    Contractor: Contractor,
): Promise<AxiosResponse<Contractor>> {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/contractor',
        data: Contractor,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<Contractor>(config);
}
