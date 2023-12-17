import { useRouter } from 'vue-router';
import { loginService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { UserLogin } from '../types/authTypes';

export default function useLogin() {
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
            const token = await loginService(form.username, form.password);

            if (token) {
                store.setToken(token.data.access_token);
                router.push('/home');
            }
            loading.value = false;
        } catch (error: any) {
            errors.value = true;
            if (error.response.status == 401) {
                message.value = 'ERROR USUARIO NO AUTORIZADO';
                description.value =
                    'Ha introducido incorrectamente el usuario y/o la contraseña';
            } else {
                message.value = 'HAY un problema con la API';
                description.value = 'No se encuentra disponible la API';
            }
            setTimeout(() => {
                errors.value = false;
            }, 5000);
        }
        loading.value = false;
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
