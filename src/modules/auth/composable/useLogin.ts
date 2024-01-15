import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store.c';
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
    const { setInfo, getRefresh_token } = store;

    onMounted(async () => {
        if (getRefresh_token()) router.push('/hom');
    });
    const handleError = (error: any) => {
        errors.value = true;
        const { title, desc } = getError(error);
        message.value = title;
        description.value = desc;

        setTimeout(() => {
            errors.value = false;
        }, 5000);
    };
    const login = async (): Promise<void> => {
        loading.value = true;
        try {
            const { username, password } = form;
            const data = (await post('/auth/login', { username, password })).data;

            if (data) {
                setInfo(data); //cambie para el refresh
                router.push('/hom');
            }
            loading.value = false;
        } catch (error: any) {
            handleError(error);
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
