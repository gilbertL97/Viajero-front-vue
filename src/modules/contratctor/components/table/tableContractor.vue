<template>
    <div>
        <a-table
            :columns="columns"
            :data-source="props.data"
            size="small"
            :loading="props.loading"
        >
            <template #customFilterIcon><slot></slot></template>
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-popconfirm
                        :title="`Desea eliminar al Cliente ${record.client} ?`"
                        @confirm="onDelete(record.id)"
                    >
                        <a-tooltip>
                            <template #title>Eliminar</template>

                            <a-button type="danger"
                                ><template #icon> <DeleteOutlined /></template
                            ></a-button>
                        </a-tooltip>
                    </a-popconfirm>
                    <a-tooltip>
                        <template #title>Editar</template>
                        <a-button type="primary" @click="editContractor(record.id)">
                            <template #icon>
                                <EditOutlined />
                            </template>
                        </a-button>
                    </a-tooltip>
                </template>
                <template v-if="column.dataIndex === 'state'">
                    <span>
                        <a-tag :color="record.isActive == false ? 'red' : 'green'">
                            {{ record.isActive == false ? 'Inactivo' : 'Activo' }}
                        </a-tag>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script lang="ts" setup>
    import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
    import { Contractor } from '../../types/contractor.types';

    // const selectedRowKeys = ref<Contractor['id'][]>([]);

    const props = defineProps<{
        data?: Contractor[];
        loading: boolean;
    }>();
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'client',
        },
        {
            title: 'Correo',
            dataIndex: 'email',
        },
        {
            title: 'Poliza',
            dataIndex: 'poliza',
        },
        {
            title: 'No de Analisis',
            dataIndex: 'analysis_number',
        },

        {
            title: 'Estado',
            dataIndex: 'state',
        },
        { title: 'Operaciones', dataIndex: 'action', customFilterDropdown: true },
    ];
    const onDelete = async (key: number) => {
        emit('delete', key);
    };

    const editContractor = (id: number) => {
        emit('update', id);
    };

    const emit = defineEmits<{
        (e: 'delete', deleted: number): void;
        (e: 'update', updated: number): void;
    }>();
</script>

<style lscoped></style>
