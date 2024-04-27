<template>
    <a-table :columns="columns" size="small" :loading="loading" :data-source="data">
        <template #customFilterIcon>
            <slot name="export"></slot>
        </template>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'created_at'">
                {{ dayjs(record.created_at).format('DD/MM/YYYY') }}
            </template>
            <template v-if="column.dataIndex === 'contractor'">
                {{ record.contractor.client }}
            </template>
            <template v-if="column.dataIndex === 'user'">
                {{ record.user ? record.user.name : '-' }}
            </template>
            <template v-if="column.dataIndex === 'actions'">
                <a-tooltip v-if="acces('delete-files')">
                    <template #title>Eliminar</template>
                    <a-button type="primary" danger @click="onDelete(record.id)"
                        ><template #icon> <DeleteOutlined /></template
                    ></a-button>
                </a-tooltip>
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