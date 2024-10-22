<template>
    <div class="form">
        <a-form
            :model="user"
            :validate-messages="defaultValidateMessages"
            v-bind="layout"
            @finish="handleOk"
        >
            <a-form-item
                has-feedback
                :name="['name']"
                label="Nombre"
                :rules="[{ required: true, min: 5 }]"
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
                :rules="[{ required: !props.id, min: 6 }]"
            >
                <a-input-password
                    v-model:value="user.password"
                    :visibilityToggle="true"
                    placeholder="Contraseña"
                >
                    <template #prefix
                        ><LockOutlined style="color: rgba(255, 255, 255)"
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
                    <a-select-option :value="UserRole.CONSULTAGENT">{{
                        UserRoleEquivalen.CONSULTAGENT
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <div
                v-if="user.role == UserRole.CLIENT || user.role == UserRole.CONSULTAGENT"
            >
                <a-form-item
                    :name="['contractor']"
                    label="Agencia"
                    :rules="[{ required: true }]"
                >
                    <DropdownContrac
                        :data="contractors"
                        :contractor="contractor.client"
                        :contractor-id="contractor.id"
                        @selected="asignContract"
                        :active-select="false"
                    />
                </a-form-item>
            </div>
            <a-form-item :name="['active']" label="Activo">
                <a-checkbox v-model:checked="user.active" />
            </a-form-item>
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
    import { onMounted, reactive, ref } from 'vue';
    import { LockOutlined } from '@ant-design/icons-vue';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import { UserRole, UserRoleEquivalen } from '@/modules/user/types/user.types';
    import { Contractor } from '@/modules/contratctor/types/contractor.types';
    import { useRouter } from 'vue-router';
    import { editUsers, addUsers, getUser } from '../../services/user.service';
    import { UserResponse, UserReq } from '@/modules/user/types/user.types';
    import {
        defaultValidateMessages,
        repeatMessage,
    } from '@/common/utils/validationMessages';
    import Swal from 'sweetalert2';
    import useHttpMethods from '@/service/useHttpMethods';
    const { get }= useHttpMethods();

    const router = useRouter();
    const props = defineProps<{ id?: string }>();
    const id = ref(0);
    const client = ref(true);
    const loading = ref(false);
    const contractors = ref<Contractor[]>([]);
    const contractor: Contractor = reactive<Contractor>({
        email: '',
        client: '',
        telf: '',
        addres: '',
        file: '',
        poliza: '',
        isActive: true,
        analysis_number: '',
    });

    //     const formState = reactive({
    //     traveler: props.traveler,
    // });
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };
    let user: UserReq = reactive({
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
        loading.value = false;
    };
    const handleCancel = () => {
        router.push({ name: 'users' });
    };
    onMounted(async () => {
        if (props.id) id.value = +props.id;
        await charge();
    });

    const editUser = async () => {
        try {
            await editUsers(user);
            router.push({ name: 'users' });
        } catch (error) {
            alert('un nombre de usuario ', 'un email');
        }
    };
    const addUser = async () => {
        try {
            await addUsers(user);
            router.push({ name: 'users' });
        } catch (error) {
            alert('un nombre de usuario ', 'o un email');
        }
    };
    const asignContract = (value: number | number[] | undefined) => {
        user.contractor = value as number;
    };

    const alert = (message1: string, message2?: string) => {
        Swal.fire({
            title: 'Inactivo',
            text: repeatMessage(message1, message2),
            timer: 10000,
        });
    };
    onMounted(async()=>{
        contractors.value  = (await get('/contractor')).data;
    })
    //generar una contraseña aleatoria
    /* const genPass = () => {
        const password = generator.generate({
            length: 10,
            numbers: true,
        });
        user.password = password;
        window.alert('la contraseña momentania sera esta ' + password);
    };*/
    const charge = async () => {
        if (props.id) {
            const userR = (await getUser(id.value)).data;
            initializateUser(userR);
        }
    };
    const initializateUser = (userR: UserResponse) => {
        user.id = userR.id;
        user.name = userR.name;
        user.email = userR.email;
        user.role = userR.role;
        user.active = userR.active;
        if (userR.contractors?.length != 0) {
            user.contractor = userR.contractors?.[0].id;
            setContract(userR.contractors![0]);
        }
    };
    const setContract = (contractR: Contractor) => {
        contractor.id = contractR.id;
        contractor.client = contractR.client;
        contractor.email = contractR.email;
        contractor.telf = contractR.telf;
        contractor.poliza = contractR.poliza;
        contractor.addres = contractR.addres;
        contractor.file = contractR.file;
        contractor.isActive = contractR.isActive;
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
