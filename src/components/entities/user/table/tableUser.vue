<template>
    <div>
        <a-table
            :row-selection="{
                selectedRowKeys: state.selectedRowKeys,
                onChange: onSelectChange,
            }"
            :columns="columns"
            :data-source="data"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-popconfirm
                        :title="`Desea eliminar al Usuario ${record.name} ?`"
                        @confirm="onDelete(record.id)"
                    >
                        <a-button type="danger"> <DeleteOutlined /></a-button>
                    </a-popconfirm>
                    <a-button type="primary" @click="showModalb"
                        ><EditOutlined />
                    </a-button>
                    <a-modal v-model:visible="showModal" title="User">
                        <UserForm :user="record" />
                    </a-modal>
                </template>
            </template>
        </a-table>
    </div>
    <div style="margin-bottom: 16px">
        <a-button
            type="danger"
            :disabled="!hasSelected"
            :loading="state.loading"
            @click="deleteusers"
        >
            Eliminar
        </a-button>
        <span style="margin-left: 8px">
            <template v-if="hasSelected">
                {{ `Selected ${state.selectedRowKeys.length} items` }}
            </template>
        </span>
    </div>
</template>
<script lang="ts" setup>
    import { computed, ref, onMounted, reactive } from 'vue';
    import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
    import { getUsers, deleteUsers } from '../services/user.service';
    import {
        User,
        UserRole,
    } from '@/components/entities/user/types/modelTypes';
    import UserForm from '@/components/entities/user/form/formUser.vue';
    import { useAuthStore } from '@/components/auth/store/auth.store';
    const store = useAuthStore();

    let data = ref<User[]>([]);
    let showModal = ref(false);

    const state = reactive<{
        selectedRowKeys: User['id'][];
        loading: boolean;
    }>({
        selectedRowKeys: [], // Aqui configurar a columna por default
        loading: false,
    });

    onMounted(async () => {
        try {
            data.value = (await getUsers()).data;
        } catch (error) {}
        onDeleteAdmin();
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Correo',
            dataIndex: 'email',
        },
        {
            title: 'rol',
            dataIndex: 'role',
        },
        { title: 'Operaciones', dataIndex: 'action' },
    ];

    //const selectedRowKeys = ref<User['id'][]>([]); // Check here to configure the default column

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const deleteusers = () => {
        state.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
            state.loading = false;
            state.selectedRowKeys = [];
        }, 1000);
    };

    const onSelectChange = (selectedRowKeys: number[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);

        state.selectedRowKeys = selectedRowKeys;
    };

    const onDelete = async (key: number) => {
        console.log(key);
        await deleteUsers(key);
        data.value = data.value.filter((item) => item.id !== key);
    };
    const onDeleteAdmin = async () => {
        const user = store.getUserInfo;
        if (user?.role == UserRole.ADMIN)
            data.value = data.value.filter((item) => item.id !== user.id);
    };
    const showModalb = () => {
        console.log('este es el q pincha');
        showModal.value = true;
    };
    /* const handleCancel = () => {
        console.log('este es el q pincha');
        showModal.value = false;
    };

    const handleOk = () => {
        state.loading = true;
        setTimeout(() => {
            state.loading = false;
        }, 2000);
    };*/
</script>

<style lscoped></style>
