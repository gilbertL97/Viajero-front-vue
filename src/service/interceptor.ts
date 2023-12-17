import { useAuthStore } from '@/modules/auth/store/auth.store';
import router from '@/router';
import API from './api';

API.interceptors.request.use((config) => {
    const store = useAuthStore();

    if (store.getToken) {
        config.headers!.Authorization = `Bearer ${store.token}`;
    }
    return config;
});

API.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        error = error.response
            ? error
            : {
                  response: {
                      data: {
                          message:
                              'Cors error,Check preflight request, there is not response from server',
                      },
                      statusText: 'Cors Errors , There no status text',
                  },
              };

        if (error.response.status == 401) {
            router.push({ name: 'login' });
        }
        throw error;
    },
);
