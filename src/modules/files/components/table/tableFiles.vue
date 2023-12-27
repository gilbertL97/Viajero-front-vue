<template>
    <a-table :columns="columns" size="small" :loading="loading" :data-source="data">
        <template #customFilterIcon>
            <slot name="export"></slot>
        </template>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'created_at'">
                <h4>{{ dayjs(record.created_at).format('DD/MM/YYYY') }}</h4>
            </template>
            <template v-if="column.dataIndex === 'contractor'">
                <h4>{{ record.contractor.client }}</h4>
            </template>
            <template v-if="column.dataIndex === 'user'">
                <h4>{{ record.user ? record.user.name : '-' }}</h4>
            </template>
            <template v-if="column.dataIndex === 'actions'">
                <a-tooltip v-if="acces('delete-files')">
                    <template #title>Eliminar</template>
                    <a-button type="danger" @click="onDelete(record.id)"
                        ><template #icon> <DeleteOutlined /></template
                    ></a-button>
                </a-tooltip>

                <!-- <a-popconfirm
                    :title="`Desea eliminar al Fichero ${record.name} ?`"
                    @confirm="onDelete(record.id)"
                >
                    <a-tooltip>
                        <template #title>Eliminar</template>

                        <a-button type="danger"
                            ><template #icon> <DeleteOutlined /></template
                        ></a-button>
                    </a-tooltip>
                </a-popconfirm> -->
                <a-tooltip>
                    <template #title>ver Viajeros</template>
                    <a-button type="primary" @click="viewTraveler(record.id)">
                        <template #icon>
                            <UsergroupAddOutlined />
                        </template>
                    </a-button>
                </a-tooltip>
            </template>
        </template>
    </a-table>
</template>

<script setup lang="ts">
    import { DeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons-vue';
    import { FileD } from '../../type/file.type';
    import dayjs from 'dayjs';
    import { useAuthStore } from '@/modules/auth/store/auth.store.c';
    const store = useAuthStore();
    defineProps<{
        data: FileD[];
        loading: boolean;
        columns: any[];
    }>();

    onMounted(async () => {});
    const onDelete = async (id: number) => {
        emit('delete', id);
    };
    const viewTraveler = (id: number) => {
        emit('getTravelers', id);
    };
    const emit = defineEmits<{
        (e: 'delete', id: number): void;
        (e: 'getTravelers', id: number): void;
    }>();
    const acces = (view: string) => {
        return store.canAccess(view);
    };
</script>
