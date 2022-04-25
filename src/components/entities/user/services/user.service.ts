import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { addAuthHeader } from './auth.service';
import API from './api';
import { User } from '@/types/modelTypes';
import { useAuthStore } from '../store/auth.store';
const store = useAuthStore();

export async function getUsers(): Promise<AxiosResponse<User[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/user',
    };
    addAuthHeader(store.getToken as string);
    return await API.request<User[]>(config);
}
export async function deleteUsers(id: number): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: '/user/' + id,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<void>(config);
}

export async function editUsers(
    id: number,
    user: User,
): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: '/user',
        data: user,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<void>(config);
}
