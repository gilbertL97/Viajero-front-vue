import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store.c';
import { UserLogin } from '../types/authTypes';
import useHttpMethods from '@/service/useHttpMethods';
import { getErrorLogin } from '@/common/helper/errorHandler';

export default function useAuth() {
    const { post } = useHttpMethods();
    const store = useAuthStore();
    const router = useRouter();
    const errors = ref(false);
    const message = ref('');
    const description = ref('');
    const form = reactive<UserLogin>({
        username: '',
        password: '',
    });
    const loading = ref(false);
    const { setInfo, getRefresh_token, clearAll } = store;

    onMounted(async () => {
        if (getRefresh_token()) router.push('/hom');
    });
    const handleError = (error: any) => {
        errors.value = true;
        const { title, desc } = getErrorLogin(error);
        message.value = title;
        description.value = desc;

        setTimeout(() => {
            errors.value = false;
        }, 5000);
    };
    const login = async (): Promise<void> => {
        loading.value = true;

        const { username, password } = form;
        const data = await post('/auth/login', { username, password })
            .catch((error) => handleError(error))
            .finally(() => (loading.value = false));
        if (data) {
            setInfo(data.data); //cambie para el refresh
            router.push('/hom');
        }

        loading.value = false;
    };
    const postRfresh = async () => {
        const token = getRefresh_token();
        if (token) {
            try {
                const data = (await post('/auth/refresh', { refresh_token: token })).data;
                setInfo(data);
                return data;
            } catch (error) {
                throw error;
            }
        }
        throw new Error('no token');
    };
    const logout = async () => {
        try {
            const token = getRefresh_token();
            const status = (await post('/auth/logout', { refresh_token: token })).status;
            if (status == 201) {
                clearAll();
            }
        } catch (error) {
            throw error;
        }
    };
    return {
        form,
        loading,
        errors,
        message,
        description,
        login,
        logout,
        postRfresh,
    };
}
