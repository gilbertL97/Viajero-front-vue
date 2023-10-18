import type { GenericObject } from '@/common/types/generic.type';
import type { AxiosResponse } from 'axios';
export interface Init {
    baseURL?: string;
    withCredentials?: boolean;
    customHeaders?: GenericObject;
    customParams?: GenericObject | URLSearchParams;
    handleSuccess?: (
        value: AxiosResponse<any, any>,
    ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>;
    handleError?: ((error: any) => any) | undefined;
}
