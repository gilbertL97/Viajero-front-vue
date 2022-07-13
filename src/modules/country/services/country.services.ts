import API from '@/service/api';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Country } from '../types/country.type';

export async function getCountries(): Promise<AxiosResponse<Country[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/country',
    };
    return await API.request<Country[]>(config);
}
export async function getCountry(iso: string): Promise<AxiosResponse<Country>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/country/' + iso,
    };
    return await API.request<Country>(config);
}
