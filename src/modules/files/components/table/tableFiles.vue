<template>
    <a-table :columns="columns" size="small" :loading="loading" :data-source="data">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'created_at'">
                <h5>{{ dayjs(record.created_at).format('DD/MM/YYYY') }}</h5>
            </template>
            <template v-if="column.dataIndex === 'actions'">
                <a-popconfirm
                    :title="`Desea eliminar al Cliente ${record.name} ?`"
                    @confirm="onDelete(record.id)"
                >
                    <a-button type="danger"
                        ><template #icon> <DeleteOutlined /></template
                    ></a-button>
                </a-popconfirm>
                <a-button type="primary">
                    <template #icon>
                        <UsergroupAddOutlined />
                    </template>
                </a-button>
            </template>
        </template>
    </a-table>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { DeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons-vue';
    import { FileD } from '../../type/file.type';

    import dayjs from 'dayjs';

    defineProps<{
        data: FileD[];
        loading: boolean;
        columns: any[];
    }>();

    onMounted(async () => {});

    const onDelete = async (id: number) => {
        emit('delete', id);
    };

    const emit = defineEmits<{
        (e: 'delete', id: number): void;
    }>();
</script>
