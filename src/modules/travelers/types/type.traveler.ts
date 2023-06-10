import { Contractor } from '@/modules/contratctor/types/contractor.types';
import { Country } from '@/modules/country/types/country.type';
import { Plans } from '@/modules/plains/types/plains.types';
import { Dayjs } from 'dayjs';

export interface Traveler {
    id?: number;
    name: string;
    sex?: string;
    born_date?: Date | null | Dayjs;
    email?: string;
    passport: string;
    sale_date?: Date | null | Dayjs;
    start_date: Date | null | Dayjs;
    end_date_policy: Date | null | Dayjs;
    number_high_risk_days?: number;
    contractor?: number;
    origin_country?: string;
    nationality?: string;
    coverage?: number;
    number_days: number;
    amount_days_high_risk: number;
    amount_days_covered: number;
    total_amount: number;
}

export interface TravelerResponse {
    id?: number;
    name: string;
    sex?: string;
    born_date?: Date | null;
    email?: string;
    passport: string;
    sale_date?: Date | null;
    start_date: Date | null;
    end_date_policy: Date | null;
    number_high_risk_days?: number;
    contractor?: Contractor;
    origin_country?: Country;
    nationality?: Country;
    coverage?: Plans;
    number_days: number;
    amount_days_high_risk: number;
    amount_days_covered: number;
    total_amount: number;
    state: boolean;
    createdAt?: Date | null;
    deleteAt?: Date | null;
}

export type FilterTravelers = {
    row?: number;
    name?: string;
    passport?: string;
    start_date_init?: Date;
    start_date_end?: Date;
    end_date_policy_init?: Date;
    end_date_policy_end?: Date;
    contractor?: number;
    origin_country?: string;
    nationality?: string;
    coverage?: number;
    state?: boolean;
};

export type ErrorsDto = {
    property: string;
    errors: string;
};
export type FileErrorsDto = {
    row: number;
    errors: ErrorsDto[];
};
