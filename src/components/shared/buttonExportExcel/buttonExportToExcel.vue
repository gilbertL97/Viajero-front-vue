<template>
    <a-button @click="exportExcel"
        ><template #icon><FileExcelOutlined /> </template>
    </a-button>
</template>

<script setup lang="ts">
    import exportToExcel from '@/common/utils/exportToExcel';
    import { FileExcelOutlined } from '@ant-design/icons-vue';
    const props = defineProps<{
        data: any[];
        title: string;
        columns: Columns[];
    }>();
    const { getWorkBook } = exportToExcel(props.title, props.columns, props.data);
    const exportExcel = async () => {
        const buffer = await getWorkBook();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'datos.xlsx';
        link.click();
    };
    type Columns = {
        title: string;
        dataIndex: string;
    };
</script>

<style scoped></style>
