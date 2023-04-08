import { ref } from 'vue';
import * as ExcelJS from 'exceljs';

export default function useExcel(title: string) {
    type Columns = {
        title: string;
        dataIndex: string;
    };
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(title);

    const data = ref<any>([]);
    //const columns = ref <Columns[]>([]);

    const addData = (newData: any[]) => {
        data.value = newData;
    };
    const addColumns = (columns: Columns[]) => {
        worksheet.columns = columns.map((col) => {
            return { header: col.title, key: col.dataIndex };
        });
    };
    const exportExcel = () => {
        const dat = data.value.map((elem: any) => flater(elem));
        //console.log(title, data.value);
        worksheet.addRows(dat);

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.xlsx';
            a.click();
        });
    };

    const flater = (elem: any) => {
        const keys = Object.keys(elem);
        const element = elem;
        keys.forEach((key) => {
            if (typeof elem[key] == 'object') element[key] = getName(elem[key]);
            element[key] = elem[key];
        });
        return element;
    };
    const getName = (elem: any) => {
        if (elem.constructor.name == 'TravelerResponse') return elem.name;
        if (elem.constructor.name == 'Plans') return elem.name;
        if (elem.constructor.name == 'Country') return elem.comun_name;
        if (elem.constructor.name == 'Contractor') return elem.comun_name;
        if ('client' in elem) return elem.client;
    };
    return {
        addData,
        addColumns,
        exportExcel,
    };
}
