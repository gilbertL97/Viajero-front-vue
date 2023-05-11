import API from '@/service/api';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export default function usePdfBack() {
    const getFilelPdf = async (
        url: string,
        filter?: any,
    ): Promise<AxiosResponse<Buffer>> => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: url,
            params: filter,
            responseType: 'blob',
        };
        return await API.request<Buffer>(config);
    };
    const downloadPdf = async (url: string, filter: any, title: string) => {
        await getFilelPdf(url, filter).then((response) => {
            if (response.status == 200) {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                window.open(URL.createObjectURL(blob), '_blank');
            }
        });
    };
    return {
        downloadPdf,
    };
}
