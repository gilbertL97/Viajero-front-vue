<template>
    <a-table
        :columns="columns"
        size="small"
        :data-source="data"
        :loading="loading"
        :scroll="{ x: 1300, y: 180 }"
    />
</template>
<script setup lang="ts">
    import type { TableColumnsType } from 'ant-design-vue';
    import { FileErrorsDto, FilterTravelers } from '../../types/type.traveler';
    withDefaults(
        defineProps<{
            columns?: TableColumnsType;
            data?: FileErrorsDto[] | FilterTravelers[];
            loading?: boolean;
        }>(),
        {
            loading: false,
        },
    );
</script>

<style scoped></style>
