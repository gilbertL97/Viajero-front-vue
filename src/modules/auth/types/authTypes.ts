import { User } from '@/modules/user/types/user.types';

export type UserLogged = { access_token: string; id: string; role: string };
export interface UserLogin {
    username: string;
    password: string;
}

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
