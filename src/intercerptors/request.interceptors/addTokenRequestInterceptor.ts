import { InternalAxiosRequestConfig } from "axios";

export function addToken (config: InternalAxiosRequestConfig<any> ,acces_token : string | null | undefined) {
    if (acces_token) {
        config.headers!.Authorization = `Bearer ${acces_token}`;
    }
    return config;
}