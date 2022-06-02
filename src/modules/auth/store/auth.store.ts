import { defineStore, createPinia } from 'pinia';
import { User } from '@/modules/user/types/modeltypes';

const store = createPinia();

interface UserState {
    token?: string | null;
    userInfo: User | null;
    isloggedIn: boolean;
}

export const authStore = defineStore({
    id: 'app-user',
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
            return this.token;
        },
    },
    actions: {
        setToken(token1: string | undefined) {
            this.token = token1;
            //setToken(token)
        },
        setUserInfo(info: User) {
            this.userInfo = info;
        },
        setLogged() {
            if (typeof this.getToken === 'string' && this.getToken != '')
                this.isloggedIn = false;
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
