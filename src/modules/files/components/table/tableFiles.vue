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
    import { onMounted, ref } from 'vue';
    import { DeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons-vue';
    import { FileD } from '../../type/file.type';
    import { deletFiles, getFiles } from '../../services/file.service';
    import manageError from '@/common/composable/manageError';
    import dayjs from 'dayjs';

    const { cantDelete } = manageError();
    const loading = ref(false);
    const data = ref<FileD[]>([]);
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Fecha Importación',
            dataIndex: 'created_at',
        },
        {
            title: 'Operaciones',
            dataIndex: 'actions',
        },
    ];
    onMounted(async () => {
        loading.value = true;
        await refresh();
    });

    const refresh = async () => {
        await getData();
    };
    const getData = async () => {
        try {
            loading.value = true;
            const files = (await getAllFiles()).data;

            data.value = files;
        } catch (error) {}
        loading.value = false;
    };
    const onDelete = async (id: number) => {
        try {
            await deletFiles(id);
            refresh();
        } catch (error: any) {
            if (error.response.status == 400) {
                cantDelete();
            }
        }
    };
</script>
