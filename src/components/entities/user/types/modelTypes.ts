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
    name: string;
    email: string;
    role: string;
}

export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client',
    CONSULT = 'consult',
    MARKAGENT = 'marketing',
    COMAGENT = 'comercial',
}
