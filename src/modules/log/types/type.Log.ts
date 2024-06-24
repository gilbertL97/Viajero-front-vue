export interface Log {
    id: number;
    message: string;
    context: string;
    level: string;
    createdAt: Date;
    userAgent: string;
    requestId: string;
    ip: string;
    method: string;
    url: string;
    userId?: number;
    errorStack?: string;
}
export type HeaderFilterLog = {
    level?: string;
    userId?: number;
    createdAtInit?: string;
    createdAtEnd?: string;
};
export type LogFilter = {
    message?: string;
    context?: string;
    level?: string;
    userAgent?: string;
    requestId?: string;
    ip?: string;
    method?: string;
    url?: string;
    userId?: number;
    createdAtInit?: string;
    createdAtEnd?: string;
};
export type LogData = {
    logs:Log[];
    total:number;
}