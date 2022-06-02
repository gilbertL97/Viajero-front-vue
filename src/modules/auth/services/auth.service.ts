import { AxiosRequestConfig, AxiosResponse } from 'axios';

import API from '@/service/api';
import { User } from '@/modules/user/types/modeltypes';

interface LoginAPIResponse {
    access_token: string;
    user: User;
}

/**
 * @description Used for development puropses ONLY!
 * @params time - timeout time in s
 *
 * @example simulateApi(300)
 */
export function simulateApi(time: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

/**
 * @description Add Bearer Token to axios instance
 *
 * @param token
 *
 * @returns void
 */
export function addAuthHeader(token: string) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

/**
 * @description Login API
 * @param {string} username
 * @param {string} password - The password
 *
 * @returns {Promise<AxiosResponse<LoginAPIResponse>>} userToken
 * @example loginService('example`gilbert', '1234password')
 */
export async function loginService(
    username: string,
    password: string,
): Promise<AxiosResponse<LoginAPIResponse>> {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/auth/login', ///http://localhost:3001/viajero/auth/login
        data: {
            username,
            password,
        },
    };

    return await API.request<LoginAPIResponse>(config);
}

/**
 * @description Registration API
 * @params {User} - new user object
 *
 *
 * @example registerUser(user)
 */
/**
 * @description Logout API
 *
 * @returns void
 *
 * @example logoutService()
 */
export function logoutService() {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/logout',
    };

    return API.request(config);
}
