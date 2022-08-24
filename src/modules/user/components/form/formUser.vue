<template>
    <div class="form">
        <a-form
            :model="user"
            :validate-messages="defaultValidateMessages"
            v-bind="layout"
            @finish="handleOk"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                has-feedback
                :name="['name']"
                label="Nombre"
                :rules="[{ required: true, min: 4 }]"
            >
                <a-input
                    placeholder="Nombre "
                    v-model:value="user.name"
                    @keydown.space.prevent
                />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['password']"
                label="Contraseña"
                :rules="[{ required: true, min: 6 }]"
            >
                <a-input-password
                    v-model:value="user.password"
                    :visibilityToggle="true"
                    placeholder="Contraseña"
                >
                    <template #prefix
                        ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                    /></template>
                </a-input-password>
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['email']"
                label="Correo"
                :rules="[{ type: 'email', required: true }]"
            >
                <a-input placeholder="Correo" v-model:value="user.email" />
            </a-form-item>
            <div v-if="props.editAdmin">
                <a-form-item :name="['role']" label="Rol" :rules="[{ required: true }]">
                    <a-select v-model:value="user.role" placeholder="Seleccione el rol">
                        <a-select-option
                            @select="client = false"
                            :value="UserRole.MARKAGENT"
                            >{{ UserRoleEquivalen.MARKAGENT }}</a-select-option
                        >
                        <a-select-option :value="UserRole.CONSULT">
                            {{ UserRoleEquivalen.CONSULT }}</a-select-option
                        >
                        <a-select-option :value="UserRole.COMAGENT">{{
                            UserRoleEquivalen.COMAGENT
                        }}</a-select-option>
                        <a-select-option :value="UserRole.ADMIN">{{
                            UserRoleEquivalen.ADMIN
                        }}</a-select-option>
                        <a-select-option :value="UserRole.CLIENT">{{
                            UserRoleEquivalen.CLIENT
                        }}</a-select-option>
                    </a-select>
                </a-form-item>
                <div v-if="user.role == UserRole.CLIENT">
                    <a-form-item
                        :name="['contractor']"
                        label="Agencia"
                        :rules="[{ required: true }]"
                    >
                        <DropdownContrac
                            :contractor="user.contractor"
                            @selected="asignContract"
                        />
                    </a-form-item>
                </div>
            </div>
            <div class="btns">
                <a-form-item :wrapper-col="{ wraper: 2, offset: 13 }">
                    <a-button type="primary" html-type="submit">Aceptar</a-button>
                    <a-divider type="vertical" />
                    <a-button @click="handleCancel"> Cancelar </a-button>
                </a-form-item>
            </div>
        </a-form>
    </div>
</template>

<script setup lang="ts">
    import { UserReq, UserResponse } from '@/modules/user/types/user.types';
    import { onMounted, reactive, ref } from 'vue';
    import { editUsers, addUsers, getUser } from '../../services/user.service';
    import { UserRole, UserRoleEquivalen } from '@/modules/user/types/user.types';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/selectContract.vue';
    import { defaultValidateMessages } from '@/common/utils/validationMessages';
    import { LockOutlined } from '@ant-design/icons-vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const props = defineProps<{ id?: string; editAdmin: boolean }>();
    const id = ref(0);
    const client = ref(true);
    const loading = ref(false);

    //     const formState = reactive({
    //     traveler: props.traveler,
    // });
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };
    const user: UserReq = reactive({
        id: -1,
        name: '',
        email: '',
        role: UserRole.CONSULT,
        active: false,
        contractor: undefined,
    });
    //const contractor=props.user.contractors[0].id;

    const handleOk = async () => {
        loading.value = true;
        if (props.id) await editUser();
        else await addUser();
        router.push({ name: 'users' });
        loading.value = false;
    };
    const handleCancel = () => {
        router.push({ name: 'users' });
        console.log(user.contractor);
    };
    onMounted(async () => {
        if (props.id) id.value = +props.id;
        console.log(user);
        await charge();
    });

    const editUser = async () => {
        try {
            await editUsers(user);
            console.log(user);
        } catch (error) {}
    };
    const addUser = async () => {
        try {
            await addUsers(user);
        } catch (error) {}
    };
    const asignContract = (value: number | undefined) => {
        user.contractor = value;
        console.log(
            'este es el value :' + value,
            'este es el user.contractor:' + user.contractor,
        );
    };

    //generar una contraseña aleatoria
    /* const genPass = () => {
        const password = generator.generate({
            length: 10,
            numbers: true,
        });
        user.password = password;
        window.alert('la contraseña momentania sera esta ' + password);
    };*/
    const onFinishFailed = (values: any) => {
        console.log('tiht', values);
    };
    const charge = async () => {
        if (props.id) {
            const userR: UserResponse = (await getUser(id.value)).data;
            initializateUser(userR);
        }
    };
    const initializateUser = (userR: UserResponse) => {
        (user.id = userR.id),
            (user.name = userR.name),
            (user.email = userR.email),
            (user.role = userR.role),
            (user.active = false),
            (user.contractor = userR.contractors?.[0]?.id);
    };
</script>

<style lang="scss" scoped>
    .form {
        display: block;
    }
    .btns {
        padding-top: 15px;
    }
</style>
