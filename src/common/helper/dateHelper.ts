import dayjs from 'dayjs';

export class CalculateDays {
    public static daysDifference(initialDate: Date, finalDate: Date) {
        const init = dayjs(finalDate);
        return init.diff(initialDate);
    }
}
