<template>
    <div>
        <a-table
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
            }"
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
                        <a-button type="danger">
                            <template #icon><DeleteOutlined /></template>
                        </a-button>
                    </a-popconfirm>
                    <a-button type="primary" @click="handleUser(record)"
                        ><template #icon><EditOutlined /></template>
                    </a-button>
                </template>
                <template v-if="column.dataIndex === 'role'">
                    {{ rolKeyvalue[record.role] }}</template
                >
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
    <a-button @click="handleUser">Añadir</a-button>
    <a-modal
        v-model:visible="showModal"
        title="User"
        :footer="null"
        :destroy-on-close="true"
    >
        <UserForm
            :new-user="isNewUser"
            :edit-admin="true"
            :user="user"
            @finish="handleFinishModal"
        />
    </a-modal>
</template>
<script lang="ts" setup>
    import { computed, ref, onMounted, reactive } from 'vue';
    import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
    import { getUsers, deleteUsers } from '../../services/user.service';
    import { UserRole, rolKeyvalue, UserResponse } from '@/modules/user/types/user.types';
    import UserForm from '@/modules/user/components/form/formUser.vue';
    import { useAuthStore } from '@/modules/auth/store/auth.store';
    const store = useAuthStore();
    const selectedRowKeys = ref<UserResponse['id'][]>([]);

    let data = ref<UserResponse[]>([]);
    const showModal = ref(false);
    const isNewUser = ref(false);
    const user = reactive<UserResponse>({
        id: -1,
        name: '',
        email: '',
        role: UserRole.CONSULT,
        active: false,
        contractors: undefined,
    });
    // let editable: User = reactive({
    //     name: '',
    //     email: '',
    //     role: '',
    // });

    const state = reactive<{
        selectedRowKeys: UserResponse[];
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

    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const deleteusers = () => {
        state.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
            state.loading = false;
            state.selectedRowKeys = [];
        }, 1000);
    };

    const onSelectChange = (selectedRowKeys: UserResponse[]) => {
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
        // para q funcione en los navegadores viejos
        if (user != null) {
            if (user.role == UserRole.ADMIN)
                data.value = data.value.filter((item) => item.id !== user.id);
        }
    };
    const handleUser = (record?: any) => {
        isNewUser.value = true;
        if (record) isNewUser.value = false;
        showModal.value = true;
        user.id = record.id;
        user.name = record.name;
        user.email = record.email;
        user.role = record.role;
        user.active = record.active;
        user.contractors = record.contractors;
    };
    const handleFinishModal = async (visible: boolean) => {
        showModal.value = visible;
        await refresh();
    };

    const refresh = async () => {
        state.loading = true;
        try {
            data.value = (await getUsers()).data;
        } catch (error) {}
        onDeleteAdmin();
        state.loading = false;
    };
</script>
<style lscoped></style>
