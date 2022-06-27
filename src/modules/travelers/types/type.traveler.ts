import { Contractor } from '@/modules/contratctor/types/contractor.types';
import { Plans } from '@/modules/plains/types/plains.types';

export interface Traveler {
    name: string;
    sex?: string;
    born_date: Date;
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
}

export interface Country {
    iso2: string;
    iso: string;
    nombre_largo?: string;
    nombre_corto?: string;
    nombre_comun: string;
}
