import { defineStore, createPinia } from 'pinia';
import { extract_user_data } from '@/common/jwt/util.jwt';
import { AccesControl, UserAuth } from '../types/authTypes';
import accesRole from '@/helpers/helpers/routes.role.json';
import SimpleCrypto from 'simple-crypto-js';

const store = createPinia();
const simpleCrypto = new SimpleCrypto(import.meta.env.VITE_SECRET_SALT as string);
interface UserState {
    acces_token?: string | null;
    refresh_token?: string | null;
    userInfo: UserAuth | null;
    isloggedIn: boolean;
    time: Date | null;
}

export const authStore = defineStore('app-user', {
    state: (): UserState => ({
        acces_token: '',
        refresh_token: '',
        userInfo: null,
        isloggedIn: false,
        time: null,
    }),
    getters: {
        getUserInfo(): UserAuth | null {
            if (!this.userInfo) {
                if (this.acces_token) {
                    const { username, id, role, iat } = extract_user_data(
                        'user',
                        this.acces_token,
                    );
                    this.userInfo = {} as UserAuth;
                    this.userInfo!.id = id;
                    this.userInfo!.rol = role;
                    this.userInfo!.username = username;
                    this.time = iat;
                    const rolesAcces = <AccesControl[]>accesRole;
                    const access = rolesAcces.find(
                        (roles) => this.userInfo?.rol == roles.role,
                    );
                    this.userInfo.views = access;
                }
            }
            return this.userInfo;
        },
        getToken(): string | null | undefined {
            if (this.acces_token) return this.acces_token;
        },
        getRefreshToken(): string | null | undefined {
            if (this.refresh_token) return this.refresh_token;
            const tok = localStorage.getItem('refresh');
            this.refresh_token = tok ? simpleCrypto.decrypt(tok).toString() : '';
            this.getUserInfo;
            return this.refresh_token;
        },
        isloggedIn(): boolean {
            return this.getToken ? true : false;
        },
    },
    actions: {
        setToken(acces: string, refresh: string) {
            this.acces_token = acces;
            this.refresh_token = refresh;
            localStorage.setItem('refresh', simpleCrypto.encrypt(refresh));
            this.setUserInfo(acces);
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
        clearToken() {
            this.acces_token = null;
            this.time = null;
            localStorage.removeItem('token');
        },
        logout() {
            localStorage.removeItem('token');
            this.acces_token = '';
        },
        setLogged() {
            if (typeof this.getToken === 'string' && this.getToken != '') {
                this.isloggedIn = true;
            }
        },
        resetState() {
            this.acces_token = '';
            this.userInfo = null;
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
