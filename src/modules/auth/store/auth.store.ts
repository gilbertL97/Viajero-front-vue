import { defineStore, createPinia } from 'pinia';
import { extract_user_data } from '@/common/jwt/util.jwt';
import { AccesControl, UserAuth } from '../types/authTypes';
import accesRole from '@/helpers/helpers/routes.role.json';

const store = createPinia();

interface UserState {
    token?: string | null;
    userInfo: UserAuth | null;
    isloggedIn: boolean;
}

export const authStore = defineStore('app-user', {
    state: (): UserState => ({
        token: '',
        userInfo: null,
        isloggedIn: false,
    }),
    getters: {
        getUserInfo(): UserAuth | null {
            if (this.getToken) {
                const { username, id, role } = extract_user_data('user', this.getToken);
                this.userInfo = {} as UserAuth;
                this.userInfo!.id = id;
                this.userInfo!.rol = role;
                this.userInfo!.username = username;
            }
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
        setUserInfo(info: UserAuth) {
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
        canAccess(view: string): boolean {
            this.getUserInfo;
            const rolesAcces = <AccesControl[]>accesRole;
            const access = rolesAcces.find((roles) => {
                this.userInfo?.rol == roles.role;
                return roles.acces;
            });
            const can = access?.acces.some((ac) => ac == view);
            console.log(view, can);
            if (can) return true;
            return false;
        },
    },
});

export function useAuthStore() {
    return authStore(store);
}
