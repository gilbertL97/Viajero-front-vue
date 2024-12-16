import useRefreshTokenService from "@/modules/auth/composable/useRefreshTokenService";
import { useAuthStore } from "@/modules/auth/store/auth.store.c";
import API from "@/service/api";
import { AxiosError, AxiosRequestConfig } from "axios";


const { postRfresh } = useRefreshTokenService();
const { logout } = useAuthStore();
type AxiosRequestConfigRetry = AxiosRequestConfig & { _retry?: boolean };

export async function  resendRefreshTokenIfExpire(error: AxiosError) {
    if(error.config){
        const originalConfig: AxiosRequestConfigRetry = error.config;
        console.log(originalConfig.url?.includes('/auth/'));
        //que no me vuelva hcer una peticion a ningun endpoin t de auth
        if (error.response && !originalConfig.url?.includes('/auth/')) {
            if (error.response.status == 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                await postRfresh().catch(() => logout());
                return API(originalConfig);
            }
            // redirectLogin();
        }
        throw error;
    }
    };
