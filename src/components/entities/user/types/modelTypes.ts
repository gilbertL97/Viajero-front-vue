export type User = {
    id: number;
    name: string;
    active: boolean;
    email: string;
    role: string;
    password?: string;
};
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
    changePas?: changePass;
}
export interface changePass {
    password1: string;
    password2: string;
}

export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client',
    CONSULT = 'consult',
    MARKAGENT = 'marketing',
    COMAGENT = 'comercial',
}

export enum UserRoleEquivalen {
    ADMIN = 'Administrador',
    CLIENT = 'Cliente',
    CONSULT = 'Consultante',
    MARKAGENT = 'Agente de Marketing',
    COMAGENT = 'Agente Comercial',
}
const roles = ['admin', 'client', 'consult', 'marketing', 'comercial'];

type TCustomKeys = { [key in typeof roles[number]]: string };

export const rolKeyvalue: TCustomKeys = {
    admin: 'Administrador',
    client: 'Cliente',
    consult: 'Consultante',
    marketing: 'Agente de Marketing',
    comercial: 'Agente Comercial',
};
