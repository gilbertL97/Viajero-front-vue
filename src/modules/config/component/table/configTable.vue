<template>
    <a-table
        :columns="columns"
        :data-source="props.data"
        size="small"
        :loading="props.loading"
        ><template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'action'">
                <a-tooltip>
                    <template #title>Editar</template>
                    <a-button type="primary" @click="editContractor(record)">
                        <template #icon>
                            <EditOutlined />
                        </template>
                    </a-button>
                </a-tooltip>
            </template>
        </template>
    </a-table>
</template>

<script setup lang="ts">
    import { Config } from '../../types/config.types';
    import { EditOutlined } from '@ant-design/icons-vue';

    const props = defineProps<{
        data?: Config[];
        loading: boolean;
    }>();
    const columns = [
        {
            title: 'Nombre ',
            dataIndex: 'key',
        },
        {
            title: 'Valor',
            dataIndex: 'value',
        },
        { title: 'Operaciones', dataIndex: 'action' },
    ];
    const editContractor = (config: Config) => {
        emit('update', config);
    };
    const emit = defineEmits<{
        (e: 'update', config: Config): void;
    }>();
</script>
<style scoped></style>
