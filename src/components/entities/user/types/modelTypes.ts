export interface User {
    id: number;
    name: string;
    active: boolean;
    email: string;
    role: string;
}

export interface Contractor {
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
