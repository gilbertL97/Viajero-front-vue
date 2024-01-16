<template>
    <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :scroll="{
            x: 2000,
            y: 300,
        }"
        ><template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'duplicate'">
                <span>
                    <a-tag :color="record.duplicate && 'red'">
                        {{ record.duplicate && 'duplicado' }}
                    </a-tag>
                </span>
            </template>
        </template>
    </a-table>
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
