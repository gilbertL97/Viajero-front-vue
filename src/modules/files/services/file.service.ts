import API from '@/service/api';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { FileD } from '../type/file.type';

export async function getFiles(): Promise<AxiosResponse<FileD[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/file',
    };
    return await API.request<FileD[]>(config);
}

export async function deletFiles(id: number): Promise<AxiosResponse<FileD>> {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: '/file/' + id,
    };
    return await API.request<FileD>(config);
}
