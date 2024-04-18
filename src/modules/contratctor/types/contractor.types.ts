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
    contractors: ContractorInv[];
    total_amount: number;
    total_travelers: number;
};
export type FilterDateAndContract = {
    dateInvoicing?: string;
    id?: number;
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
    dateInvoicing?: Date | string;
    ids?: number[];
};
 type ContractorPolicy ={
    client: string;
    start_date: string;
    total_travelers: number;
    total_import: number;
}
export type ContractorPolicyTotal = {
    contractors:ContractorPolicy[]
    totalAmount: number,
	totalTravelers: number
}