import API from '@/service/api';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Config } from '../types/config.types';

export async function getConfigurations(): Promise<AxiosResponse<Config[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/config',
    };
    return await API.request<Config[]>(config);
}
export async function editsConfigurations(
    configs: Config,
): Promise<AxiosResponse<Config>> {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: '/config' + configs.id,
        data: configs,
    };
    return await API.request<Config>(config);
}
