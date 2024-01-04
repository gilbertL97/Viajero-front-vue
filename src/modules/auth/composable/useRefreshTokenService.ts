import useHttpMethods from '@/service/useHttpMethods';
import { useAuthStore } from '../store/auth.store.c';
const { getRefresh_token, setInfo, logout } = useAuthStore();
const { post } = useHttpMethods();

export default function useRefreshTokenService() {
    const postRfresh = async () => {
        const token = await getRefresh_token();
        if (token) {
            console.log('llego aquie , este es ek tokem', token);
            try {
                const data = (await post('/auth/refresh', { refresh_token: token })).data;
                setInfo(data);
            } catch (error) {
                throw error;
            }
        } else logout();
    };

    return {
        postRfresh,
    };
}
