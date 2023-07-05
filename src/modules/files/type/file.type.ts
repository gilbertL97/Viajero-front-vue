import { TravelerResponse } from '@/modules/travelers/types/type.traveler';
import { User } from '@/modules/user/types/user.types';

export type FileD = {
    id?: number;
    name?: string;
    created_at?: Date;
    start_date_create?: Date;
    end_date_create?: Date;
    contractor?: number;
    travelers?: TravelerResponse[];
    user?: User;
};
