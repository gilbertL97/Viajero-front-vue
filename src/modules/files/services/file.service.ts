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
export async function getFile(id: number): Promise<AxiosResponse<FileD>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/file/' + id,
        //params: id,
    };
    return await API.request<FileD>(config);
}
export async function getFileByname(name: string): Promise<AxiosResponse<FileD>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/file/name/' + name,
        //params: id,
    };
    return await API.request<FileD>(config);
}
export async function filterFiles(file: FileD): Promise<AxiosResponse<FileD[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/file/filter',
        params: file,
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

export async function getFilelExcel(file: FileD): Promise<AxiosResponse<Buffer>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/file/excel',
        params: file,
        responseType: 'blob',
    };
    return await API.request<Buffer>(config);
}

export async function autoImportFiles(): Promise<AxiosResponse<Buffer>> {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/file/task',
        responseType: 'blob',
    };
    return await API.request<Buffer>(config);
}
