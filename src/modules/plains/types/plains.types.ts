export interface Plans {
    id?: number;
    name?: string;
    price?: number;
    high_risk?: number;
    number_of_days?: number;
    daily?: boolean;
    config_string?: string;
    isActive: boolean;
    tablePdf?: File;
}
