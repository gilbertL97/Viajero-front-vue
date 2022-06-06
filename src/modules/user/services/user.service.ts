import { AxiosResponse, AxiosRequestConfig } from 'axios';
import API from '@/service/api';
import { EditUser, User } from '@/modules/user/types/modeltypes';

export async function getUsers(): Promise<AxiosResponse<User[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/user',
    };
    return await API.request<User[]>(config);
}
export async function getUser(id: number): Promise<AxiosResponse<User>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/user/' + id,
    };

    return await API.request<User>(config);
}

export async function deleteUsers(id: number): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: '/user/' + id,
    };

    return await API.request<void>(config);
}

export async function editUsers(user: User | EditUser): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: '/user/' + user.id,
        data: user,
    };

    return await API.request<void>(config);
}
export async function addUsers(user: User): Promise<AxiosResponse<User>> {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/user',
        data: user,
    };

    return await API.request<User>(config);
}
