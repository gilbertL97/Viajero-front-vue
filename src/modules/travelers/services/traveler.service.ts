import API from '@/service/api';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { FilterTravelers, Traveler, TravelerResponse } from '../types/type.traveler';

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

export async function insertTraveler(
    traveler: Traveler,
): Promise<AxiosResponse<TravelerResponse>> {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/traveler',
        data: traveler,
    };
    return await API.request<TravelerResponse>(config);
}
export async function updateTraveler(
    traveler: Traveler,
): Promise<AxiosResponse<TravelerResponse>> {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: '/traveler/' + traveler.id,
        data: traveler,
    };
    return await API.request<TravelerResponse>(config);
}

export async function getFilterTravelers(
    filterTravelers: FilterTravelers,
): Promise<AxiosResponse<TravelerResponse[]>> {
    console.log(filterTravelers);
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/traveler/filter',
        params: filterTravelers,
    };
    return await API.request<TravelerResponse[]>(config);
}

export async function getCertTravelers(id: string): Promise<AxiosResponse<Buffer>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/traveler/cert',
        params: { id: id },
        responseType: 'blob',
    };
    return await API.request<Buffer>(config);
}

export async function deleteTravelers(
    id: string,
): Promise<AxiosResponse<TravelerResponse>> {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: '/traveler/' + id,
    };
    return await API.request<TravelerResponse>(config);
}
