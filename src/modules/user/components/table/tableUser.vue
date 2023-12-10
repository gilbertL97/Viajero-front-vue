<template>
    <div>
        <div class="add"> <a-button @click="createUser">Añadir</a-button></div>
        <a-table
            :columns="columns"
            :data-source="data"
            size="small"
            :loading="state.loading"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-popconfirm
                        :title="`Desea eliminar al Usuario ${record.name} ?`"
                        @confirm="onDelete(record.id)"
                    >
                        <a-tooltip>
                            <template #title>Eliminar</template>
                            <a-button type="danger">
                                <template #icon><DeleteOutlined /></template>
                            </a-button>
                        </a-tooltip>
                    </a-popconfirm>
                    <a-tooltip>
                        <template #title>Editar</template>
                        <a-button type="primary" @click="handleUser(record.id)"
                            ><template #icon><EditOutlined /></template>
                        </a-button>
                    </a-tooltip>
                </template>
                <template v-if="column.dataIndex === 'role'">
                    {{ rolKeyvalue[record.role] }}</template
                >
            </template>
        </a-table>
    </div>
    <div style="margin-bottom: 16px">
        <!-- <a-button
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
        </span> -->
    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted, reactive } from 'vue';
    import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
    import { getUsers, deleteUsers } from '../../services/user.service';
    import { UserRole, rolKeyvalue, UserResponse } from '@/modules/user/types/user.types';
    import { useAuthStore } from '@/modules/auth/store/auth.store';
    import { useRouter } from 'vue-router';
    const store = useAuthStore();
    //const selectedRowKey = ref<UserResponse['id'][]>([]);

    const router = useRouter();
    let data = ref<UserResponse[]>([]);
    // const showModal = ref(false);
    // const isNewUser = ref(false);

    // let editable: User = reactive({
    //     name: '',
    //     email: '',
    //     role: '',
    // });

    const state = reactive<{
        selectedRowKeys: UserResponse['id'][];
        loading: boolean;
    }>({
        selectedRowKeys: [], // Aqui configurar a columna por default
        loading: false,
    });

    onMounted(async () => {
        await refresh();
    });

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Correo',
            dataIndex: 'email',
        },
        {
            title: 'Rol',
            dataIndex: 'role',
        },
        { title: 'Operaciones', dataIndex: 'action' },
    ];

    //const selectedRowKeys = ref<User['id'][]>([]); // Check here to configure the default column

    //const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    // const deleteusers = () => {
    //     state.loading = true;
    //     // ajax request after empty completing
    //     setTimeout(() => {
    //         state.loading = false;
    //         state.selectedRowKeys = [];
    //     }, 1000);
    // };

    // const onSelectChange = (selectedRowKeys: UserResponse['id'][]) => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     state.selectedRowKeys = selectedRowKeys;
    // };

    const onDelete = async (key: number) => {
        await deleteUsers(key);
        //data.value = data.value.filter((item) => item.id !== key);
        refresh();
    };
    const onDeleteAdmin = async () => {
        const user1 = store.getUserInfo;
        // para q funcione en los navegadores viejos
        if (user1 != null) {
            if (user1.rol == UserRole.ADMIN)
                data.value = data.value.filter((item) => item.id !== user1.id);
        }
    };
    const createUser = () => {
        router.push({ name: 'create-user' });
    };
    const handleUser = (record: number) => {
        router.push('/user/edit-user/' + record);
    };
    // const initialize = () => {
    //     (user.id = -1),
    //         (user.name = ' '),
    //         (user.email = ' '),
    //         (user.role = ' '),
    //         (user.active = false),
    //         (user.contractors = []),
    //         (user.password = ' ');
    // };

    // const passData = (record: any) => {
    //     user.id = record.id;
    //     user.name = record.name;
    //     user.email = record.email;
    //     user.role = record.role;
    //     user.active = record.active;
    //     user.contractors = record.contractors;
    // };
    // const handleFinishModal = async (visible: boolean) => {
    //     showModal.value = visible;
    //     await refresh();
    //     isNewUser.value = false;
    // };

    const refresh = async () => {
        state.loading = true;
        try {
            data.value = (await getUsers()).data;
            data.value.sort((a, b) =>
                a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()
                    ? -1
                    : a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()
                    ? 1
                    : 0,
            );
        } catch (error) {}
        onDeleteAdmin();
        state.loading = false;
    };
</script>
<style scoped></style>
