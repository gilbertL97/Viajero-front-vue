import { useAuthStore } from '../store/auth.store.c';
import useHttpMethods from '@/service/useHttpMethods';
const { getRefresh_token, setInfo, logout } = useAuthStore();
const { post } = useHttpMethods();

export async function refreshTokens() {
    const token = getRefresh_token();
    if (token) {
        try {
            console.log(token);
            const data = (await post('/auth/refresh', { refresh_token: token })).data;
            setInfo(data);
        } catch (error) {
            throw error;
        }
    } else logout();
}
