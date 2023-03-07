export type Contractor = {
    id?: number;
    email: string;
    client: string;
    telf?: string;
    addres?: string;
    file: string;
    poliza: string;
    isActive: boolean;
    analysis_number: string;
};
export type ContractorInv = Contractor & {
    total_travelers: number;
    total_import: number;
};
export type ContractorsAndTotals = {
    contractors: Contractor[];
    total_amount: number;
    total_travelers: number;
};
export type FilterContractor = {
    id?: number;
    email?: string;
    client?: string;
    telf?: string;
    addres?: string;
    file?: string;
    poliza?: string;
    isActive?: boolean;
    dateInvoicing?: Date;
};
