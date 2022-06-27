import API from '@/service/api';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Traveler } from '../types/type.traveler';

export async function getPlans(): Promise<AxiosResponse<Traveler[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/coverage',
    };
    return await API.request<Traveler[]>(config);
}
