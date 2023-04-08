<template>
    <a-button @click="exportoExcel"
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
    const { addColumns, addData, exportExcel } = exportToExcel(props.title);
    const exportoExcel = async () => {
        addData(props.data);
        addColumns(props.columns);
        exportExcel();
    };
    type Columns = {
        title: string;
        dataIndex: string;
    };
</script>

<style scoped></style>
