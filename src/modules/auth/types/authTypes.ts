import { User } from '@/modules/user/types/modelTypes';

export type UserLogged = { access_token: string; id: string; role: string };
export type UserLogin = { name: string; password: string };

export type AuthState = {
    user?: User;
    isLoggedIn: boolean;
    userToken?: string;
    error: storeErrorT;
};
export type storeErrorT = {
    type: 'error' | 'warning';
    message: string;
};

export interface RegisterUserInfo {
    email: string;
    username: string;
    password: string;
}
