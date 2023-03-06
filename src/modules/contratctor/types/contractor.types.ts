export type Contractor = {
    id?: number;
    email: string;
    client: string;
    telf?: string;
    addres?: string;
    file: string;
    poliza: string;
    isActive: boolean;
};
export type ContractorInv = Contractor & {
    total_travelers: number;
    total_import: number;
};
