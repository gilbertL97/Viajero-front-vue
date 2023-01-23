<template>
    <a-table
        :columns="props.columns"
        size="small"
        :data-source="data"
        :scroll="{ x: 1300, y: 180 }"
        :pagination="false"
    />
</template>
<script setup lang="ts">
    import type { TableColumnsType } from 'ant-design-vue';
    import { FileErrorsDto, FilterTravelers } from '../../types/type.traveler';
    const props = defineProps<{
        columns?: TableColumnsType;
        data?: FileErrorsDto[] | FilterTravelers[];
    }>();
</script>

<style scoped></style>
