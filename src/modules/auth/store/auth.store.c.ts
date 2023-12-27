import { defineStore } from 'pinia';
import { extract_user_data } from '@/common/jwt/util.jwt';
import { AccesControl, UserAuth } from '../types/authTypes';
import accesRole from '@/helpers/helpers/routes.role.json';
import SimpleCrypto from 'simple-crypto-js';

const simpleCrypto = new SimpleCrypto(import.meta.env.VITE_SECRET_SALT as string);

export const useAuthStore = defineStore('app-user', () => {
    const accesToken = ref<string | null>();
    const refreshToken = ref<string | null>();
    const isloggedIn = ref(false);
    const time = ref(null);
    const userInfo = reactive<UserAuth>({
        username: '',
        id: undefined,
        rol: '',
        views: undefined,
    });
    const getRefresh_token = () => {
        if (refreshToken.value) return refreshToken.value;
        const value = localStorage.getItem('refresh_token');
        refreshToken.value = value && simpleCrypto.decrypt(value).toString();
        return refreshToken.value;
    };
    const setInfo = ({
        access_token,
        refresh_token,
    }: {
        access_token: string;
        refresh_token: string;
    }) => {
        accesToken.value = access_token;
        setRefresh_token(refresh_token);
        const { username, id, role } = extract_user_data('user', access_token);
        userInfo.id = id;
        userInfo.rol = role;
        userInfo.username = username;
        const rolesAcces = <AccesControl[]>accesRole;
        const access = rolesAcces.find((roles) => userInfo.rol == roles.role);
        userInfo.views = access;
    };
    const setRefresh_token = (value: string) => {
        refreshToken.value = value;
        localStorage.setItem('refresh_token', simpleCrypto.encrypt(value));
        //setacces_token(acces_token)
    };
    const canAccess = (view: string): boolean => {
        const can = userInfo?.views?.acces.some((ac) => ac == view);
        if (can) return true;
        return false;
    };
    const logout = () => {
        accesToken.value = null;
        localStorage.removeItem('refresh_token');
    };

    return {
        acces_token: accesToken,
        refresh_token: refreshToken,
        userInfo,
        isloggedIn,
        time,

        getRefresh_token,
        setInfo,
        logout,
        canAccess,
    };
});
