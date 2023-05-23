import { Contractor } from '@/modules/contratctor/types/contractor.types';

export interface User {
    id: number;
    name: string;
    active: boolean;
    email: string;
    role: string;
    password?: string;
}

export interface UserResponse extends User {
    contractors?: Contractor[];
}
export interface UserReq extends User {
    contractor?: number | null;
}

export interface NewUser {
    name: string;
    active: boolean;
    email: string;
    role: string;
    password: string;
}
export interface EditUser {
    id: number;
    name?: string;
    email?: string;
    role?: string;
    password?: string;
}
export interface ChangePass {
    passwordBefore: string;
    passwordNew1: string;
    passwordNew2: string;
}

export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client',
    CONSULT = 'consult',
    MARKAGENT = 'marketing',
    COMAGENT = 'comercial',
    CONSULTAGENT = 'consultagenci',
}

export enum UserRoleEquivalen {
    ADMIN = 'Administrador',
    CLIENT = 'Cliente',
    CONSULT = 'Consultante',
    MARKAGENT = 'Agente de Marketing',
    COMAGENT = 'Agente Comercial',
    CONSULTAGENT = 'Cliente Consultante',
}
const roles = ['admin', 'client', 'consult', 'marketing', 'comercial', 'consultagenci'];

type TCustomKeys = { [key in typeof roles[number]]: string };

export const rolKeyvalue: TCustomKeys = {
    admin: 'Administrador',
    client: 'Cliente',
    consult: 'Consultante',
    marketing: 'Agente de Marketing',
    comercial: 'Agente Comercial',
    consultagenci: ' Consultante de Agencia',
};
type CustomKeys = { [key in typeof roles[number]]: number };
export const rolRankingValue: CustomKeys = {
    admin: 5,
    client: 1,
    consult: 2,
    marketing: 3,
    comercial: 4,
};
