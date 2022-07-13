import API from '@/service/api';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { TravelerResponse } from '../types/type.traveler';

export async function getTravelers(): Promise<AxiosResponse<TravelerResponse[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/traveler',
    };
    return await API.request<TravelerResponse[]>(config);
}

export async function getTraveler(id: string): Promise<AxiosResponse<TravelerResponse>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/traveler/' + id,
    };
    return await API.request<TravelerResponse>(config);
}
