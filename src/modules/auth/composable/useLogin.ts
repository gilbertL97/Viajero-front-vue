import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store';
import { UserLogin } from '../types/authTypes';
import useHttpMethods from '@/service/useHttpMethods';
import { getError } from '@/common/helper/errorHandler';

export default function useLogin() {
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

    const login = async (): Promise<void> => {
        loading.value = true;
        try {
            const { username, password } = form;
            const token = (await post('/auth/login', { username, password })).data;

            if (token) {
                store.setToken(token.access_token);
                router.push('/home');
            }
            loading.value = false;
        } catch (error: any) {
            errors.value = true;
            const { title, desc } = getError(error);
            message.value = title;
            description.value = desc;

            setTimeout(() => {
                errors.value = false;
            }, 5000);
        } finally {
            loading.value = false;
        }
    };
    return {
        form,
        loading,
        errors,
        message,
        description,
        login,
    };
}
