import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { addAuthHeader } from '@/modules/auth/services/auth.service';
import API from '@/service/api';
import { EditUser, User } from '@/modules/user/types/modeltypes';
import { useAuthStore } from '@/modules/auth/store/auth.store';
const store = useAuthStore();

export async function getUsers(): Promise<AxiosResponse<User[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/user',
    };
    addAuthHeader(store.getToken as string);
    return await API.request<User[]>(config);
}
export async function getUser(id: number): Promise<AxiosResponse<User>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/user/' + id,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<User>(config);
}

export async function deleteUsers(id: number): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: '/user/' + id,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<void>(config);
}

export async function editUsers(user: User | EditUser): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: '/user/' + user.id,
        data: user,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<void>(config);
}
export async function addUsers(user: User): Promise<AxiosResponse<User>> {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/user',
        data: user,
    };
    addAuthHeader(store.getToken as string);
    return await API.request<User>(config);
}
