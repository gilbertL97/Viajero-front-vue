import { autoImportFiles } from '@/modules/files/services/file.service';
export default function useZipFile() {
    const downloadZipFile = async () => {
        await autoImportFiles().then((response) => {
            if (response.status == 201) {
                const blob = new Blob([response.data], {
                    type: 'application/zip',
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'logs.zip';
                a.click();
            }
        });
    };
    return {
        downloadZipFile,
    };
}
