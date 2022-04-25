export type UserLogged = { access_token: string; id: string; role: string };
export type UserLogin = { name: string; password: string };
export interface UserAuth {
    id: number;
    name: string;
    email: string;
    active: boolean;
    role: string;
}
export type AuthState = {
    user?: UserAuth;
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
