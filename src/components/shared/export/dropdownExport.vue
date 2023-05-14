<template>
    <a-dropdown>
        <a-button type="dashed">
            <EllipsisOutlined />
        </a-button>
        <template #overlay>
            <a-menu>
                <a-menu-item @click="exportExcel"> Exportar a Excel </a-menu-item>
                <a-menu-item @click="exportPdf"> Exportar a pdf </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
    import useExcelBack from '@/common/utils/exportToExcelBack';
    import usePdfBack from '@/common/utils/exportToPdfBack';
    import { EllipsisOutlined } from '@ant-design/icons-vue';
    const { downloadExcel } = useExcelBack();
    const { downloadPdf } = usePdfBack();
    const prop = defineProps<{
        urlExcel: string;
        urlPdf: string;
        title: string;
        filter?: any;
    }>();
    const exportExcel = async () => {
        await downloadExcel(prop.urlExcel, prop.filter, prop.title);
    };
    const exportPdf = async () => {
        await downloadPdf(prop.urlPdf, prop.filter, prop.title);
    };
</script>

<style scoped></style>
