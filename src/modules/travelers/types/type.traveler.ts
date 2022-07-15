import { Contractor } from '@/modules/contratctor/types/contractor.types';
import { Country } from '@/modules/country/types/country.type';
import { Plans } from '@/modules/plains/types/plains.types';

export interface Traveler {
    name: string;

    sex?: string;

    born_date?: Date | null;

    email?: string;

    passport: string;

    sale_date?: Date | null;

    start_date: Date | null;

    end_date_policy: Date | null;

    number_high_risk_days?: number;

    contractor?: number;

    origin_country?: string;

    nationality?: string;

    coverage: number;
}

export interface TravelerResponse {
    id: number;
    name: string;
    sex?: string;
    born_date?: Date;
    email?: string;
    passport: string;
    sale_date?: Date;
    start_date: Date;
    end_date_policy: Date;
    number_high_risk_days?: number;
    contractor: Contractor;
    origin_country?: Country;
    nationality?: Country;
    coverage: Plans;
    number_days: number;
    amount_days_high_risk: number;
    amount_days_covered: number;
    total_amount: number;
    state: boolean;
    createdAt: Date;
    deleteAt: Date;
}
