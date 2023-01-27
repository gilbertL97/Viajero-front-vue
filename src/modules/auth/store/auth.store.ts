import { defineStore, createPinia } from 'pinia';
import { User } from '@/modules/user/types/user.types';

const store = createPinia();

interface UserState {
    token?: string | null;
    userInfo: User | null;
    isloggedIn: boolean;
}

export const authStore = defineStore('app-user', {
    state: (): UserState => ({
        token: '',
        userInfo: null,
        isloggedIn: false,
    }),
    getters: {
        getUserInfo(): User | null {
            return this.userInfo;
        },
        getToken(): string | null | undefined {
            this.token = localStorage.getItem('token');
            return this.token;
        },
    },
    actions: {
        setToken(value: string) {
            this.token = value;
            localStorage.setItem('token', value);
            //setToken(token)
        },
        setUserInfo(info: User) {
            this.userInfo = info;
        },
        setLogged() {
            if (typeof this.getToken === 'string' && this.getToken != '')
                this.isloggedIn = true;
        },
        resetState() {
            this.token = '';
            this.userInfo = null;
            /* removeToken()
      resetRouter()*/
        },
    },
});

export function useAuthStore() {
    return authStore(store);
}
