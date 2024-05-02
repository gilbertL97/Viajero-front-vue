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