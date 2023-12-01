import dayjs from 'dayjs';

export class DateHelper {
    public static daysDifference(initialDate: Date, finalDate: Date) {
        const init = dayjs(finalDate);
        return init.diff(initialDate);
    }
    public static convertToRange(date: string) {
        const initMonth = dayjs(date).set('date', 1); //cambio la fecha a inicio del mes
        //le sumo otro mes a la fecha fin para que esete en el rango de ese mes
        const end = initMonth.add(1, 'month').format('YYYY-MM-DD');
        //convierto a string para trabajar
        const init = initMonth.format('YYYY-MM-DD');
        return { init, end };
    }
}
