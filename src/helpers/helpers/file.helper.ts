export const isExcel = (file: File): Boolean => {
    return (
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
};
export const isCSV = (file: File): Boolean => {
    return file.type === '//(csv)$/';
};
export const isPDF = (file: File): Boolean => {
    return file.type === 'application/pdf';
};
