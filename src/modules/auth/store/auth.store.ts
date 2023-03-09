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
            if (!this.userInfo) {
                if (this.getToken) {
                    const { username, id, role } = extract_user_data(
                        'user',
                        this.getToken,
                    );
                    this.userInfo = {} as UserAuth;
                    this.userInfo!.id = id;
                    this.userInfo!.rol = role;
                    this.userInfo!.username = username;
                    const rolesAcces = <AccesControl[]>accesRole;
                    const access = rolesAcces.find(
                        (roles) => this.userInfo?.rol == roles.role,
                    );
                    console.log('entro aqui');
                    this.userInfo.views = access;
                }
            }
            return this.userInfo;
        },
        getToken(): string | null | undefined {
            if (this.token) return this.token;
            this.token = localStorage.getItem('token');
            return this.token;
        },
    },
    actions: {
        setToken(value: string) {
            this.token = value;
            localStorage.setItem('token', value);
            this.setUserInfo(value);
            //setToken(token)
        },
        setUserInfo(token: string) {
            const { username, id, role } = extract_user_data('user', token);
            this.userInfo = {} as UserAuth;
            this.userInfo!.id = id;
            this.userInfo!.rol = role;
            this.userInfo!.username = username;
            const rolesAcces = <AccesControl[]>accesRole;
            const access = rolesAcces.find((roles) => this.userInfo?.rol == roles.role);
            this.userInfo.views = access;
        },
        logout() {
            localStorage.removeItem('token');
            this.token = '';
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
            const can = this.userInfo?.views?.acces.some((ac) => ac == view);
            if (can) return true;
            return false;
        },
    },
});

export function useAuthStore() {
    return authStore(store);
}
