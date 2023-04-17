import API from '@/service/api';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export default function useExcelBack() {
    const getFilelExcel = async (
        url: string,
        filter: any,
    ): Promise<AxiosResponse<Buffer>> => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: url,
            params: filter,
            responseType: 'blob',
        };
        return await API.request<Buffer>(config);
    };
    const downloadExcel = async (url: string, filter: any, title: string) => {
        await getFilelExcel(url, filter).then((response) => {
            if (response.status == 200) {
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = title + '.xlsx';
                a.click();
            }
        });
    };
    return {
        downloadExcel,
    };
}
