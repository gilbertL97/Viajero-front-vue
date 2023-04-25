<template>
    <a-dropdown>
        <a-button type="dashed">
            <EllipsisOutlined />
        </a-button>
        <template #overlay>
            <a-menu>
                <a-menu-item @click="exportExcel"> Exportar a Excel </a-menu-item>
                <a-menu-item key="2"> Exportar a pdf </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
    import useExcelBack from '@/common/utils/exportToExcelBack';
    import { EllipsisOutlined } from '@ant-design/icons-vue';
    const { downloadExcel } = useExcelBack();
    const prop = defineProps<{
        url: string;
        title: string;
        filter?: any;
    }>();
    const exportExcel = async () => {
        await downloadExcel(prop.url, prop.filter, prop.title);
    };
</script>

<style scoped></style>
