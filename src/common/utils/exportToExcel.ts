import ExcelJS from 'exceljs';

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

    const dat = data.map((elem) => flater(elem));
    worksheet.addRows(dat);

    const flater = (elem: any) => {
        const keys = Object.keys(elem);
        keys.forEach((key) => {
            if (typeof elem[key] == 'object') elem[key] = getName(elem[key]);
        });
    };
    const getName = (elem: any) => {
        if (elem.constructor.name == 'TravelerResponse') return elem.name;
        if (elem.constructor.name == 'Plans') return elem.name;
        if (elem.constructor.name == 'Country') return elem.comun_name;
        if (elem.constructor.name == 'Contractor') return elem.comun_name;
        if ('client' in elem) return elem.client;
    };
    const getWorkBook = async () => {
        return await workbook.xlsx.writeBuffer();
    };
    return { getWorkBook };
};
