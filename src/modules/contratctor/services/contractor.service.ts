import { AxiosResponse, AxiosRequestConfig } from 'axios';
import API from '@/service/api';
import { Contractor, ContractorsAndTotals } from '../types/contractor.types';

export async function getContractors(): Promise<AxiosResponse<Contractor[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/contractor',
    };
    return await API.request<Contractor[]>(config);
}
export async function getContractor(id: number): Promise<AxiosResponse<Contractor>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/contractor/' + id,
    };
    return await API.request<Contractor>(config);
}

export async function deleteContractors(id: number): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: '/contractor/' + id,
    };
    return await API.request<void>(config);
}
export async function getContractorsActive(): Promise<AxiosResponse<Contractor[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/contractor/active',
    };
    return await API.request<Contractor[]>(config);
}
export async function editContractors(
    Contractor: Contractor,
): Promise<AxiosResponse<void>> {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: '/contractor/' + Contractor.id,
        data: Contractor,
    };
    return await API.request<void>(config);
}
export async function addContractors(
    Contractor: Contractor,
): Promise<AxiosResponse<Contractor>> {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/contractor',
        data: Contractor,
    };
    return await API.request<Contractor>(config);
}

export async function getInvoicing(
    dateInvoicing: string,
): Promise<AxiosResponse<ContractorsAndTotals>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/contractor/invoicing',
        params: { dateInvoicing },
    };
    return await API.request<ContractorsAndTotals>(config);
}

export async function getDetailed(
    dateInvoicing?: string,
): Promise<AxiosResponse<Contractor[]>> {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/contractor/detailed',
        params: { dateInvoicing },
    };
    return await API.request<Contractor[]>(config);
}
