import { extract_user_data } from '@/common/jwt/util.jwt';
import { defineStore } from 'pinia';
import { AccesControl, UserAuth } from '../types/authTypes';
import accesRole from '@/helpers/helpers/routes.role.json';

interface UserState {
    token?: string | null;
    userInfo: UserAuth | null;
    isloggedIn: boolean;
    time: Date | null;
}
export const useVideoPlayer = defineStore('auth-store', () => {
    const userState = reactive<UserState>({
        token: '',
        userInfo: null,
        isloggedIn: false,
        time: null,
    });
    const getToken = () => {
        if (userState.token) return userState.token;
        userState.token = localStorage.getItem('token');
        assignUserInfo;
        return userState.token;
    };
    const isloggedIn = (): boolean => {
        return getToken() ? true : false;
    };
    const assignUserInfo = () => {
        if (!userState.userInfo) {
            if (userState.token) {
                setInfo(userState.token);
            }
        }
        return userState.userInfo;
    };
    const setInfo = (token: string) => {
        const { username, id, role, iat } = extract_user_data('user', token);
        userState.userInfo = {} as UserAuth;
        userState.userInfo!.id = id;
        userState.userInfo!.rol = role;
        userState.userInfo!.username = username;
        userState.time = iat;
        const rolesAcces = <AccesControl[]>accesRole;
        const access = rolesAcces.find((roles) => userState.userInfo?.rol == roles.role);
        userState.userInfo.views = access;
    };

    const setToken = (value: string) => {
        userState.token = value;
        localStorage.setItem('token', value);
        setInfo(value);
        //setToken(token)
    };
    const logout = () => {
        userState.token = null;
        userState.time = null;
        localStorage.removeItem('token');
    };
    return {};
});
