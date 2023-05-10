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
                const url = window.URL.createObjectURL(
                    new Blob([response.data], { type: 'application/pdf' }),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', title + '.pdf');
                document.body.appendChild(link);
                link.click();
                // const blob = new Blob([response.data], { type: 'application/pdf' });
                // const url = URL.createObjectURL(blob);
                // const a = document.createElement('a');
                // a.href = url;
                // a.download = title + '.pdf';
                // a.click();
            }
        });
    };
    return {
        downloadPdf,
    };
}
