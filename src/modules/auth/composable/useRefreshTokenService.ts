import useHttpMethods from '@/service/useHttpMethods';
import { useAuthStore } from '../store/auth.store.c';
const { getRefresh_token, setInfo, logout } = useAuthStore();
const { post } = useHttpMethods();

export default function useRefreshTokenService() {
    const postRfresh = async () => {
        const token = getRefresh_token();
        console.log(token);
        if (token) {
            try {
                const data = (await post('/auth/refresh', { refresh_token: token })).data;
                setInfo(data);
                return data;
            } catch (error) {
                throw error;
            }
        }
    };
    const logout2 = async () => {
        try {
            const token = getRefresh_token();
            const status = (await post('/auth/logout', { refresh_token: token })).status;
            if (status == 201) {
                logout();
            }
        } catch (error) {}
    };
    return {
        logout2,
        postRfresh,
    };
}
