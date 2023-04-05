import ExcelJS from 'exceljs';
import { TravelerResponse } from '@/modules/travelers/types/type.traveler';
type Columns = {
    title: string;
    dataIndex: string;
};
export default (title: string, columns: Columns[], data: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(title);
    worksheet.columns = columns.map((col) => {
        return { header: col.title, key: col.dataIndex };
    });
    const dat = data.map((elem) => {
        if (elem.constructor.name == 'TravelerResponse') {
            console.log(dat, worksheet.columns.keys());
        }
    });
};
