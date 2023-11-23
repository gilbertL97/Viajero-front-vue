import { TravelerResponse } from '@/modules/travelers/types/type.traveler';
import { User } from '@/modules/user/types/user.types';

export interface FileD {
    id?: number;
    name?: string;
    created_at?: Date;
    start_date_create?: Date;
    end_date_create?: Date;
    contractor?: number;
    travelers?: TravelerResponse[];
    user?: User;
}
export interface fileAndTotal {
    files: FileD[];
    total: number;
}
