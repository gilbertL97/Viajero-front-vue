<template>
    <div class="form">
        <a-form
            :model="user"
            :validate-messages="validateMessages"
            @finish="handleOk"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                has-feedback
                :name="['user', 'name']"
                label="Nombre"
                :rules="[{ required: true }]"
            >
                <a-input placeholder="Nombre " v-model:value="user.name" />
            </a-form-item>
            <a-form-item
                :name="['user', 'email']"
                label="Correo"
                :rules="[{ type: 'email', required: true }]"
            >
                <a-input placeholder="Correo" v-model:value="user.email" />
            </a-form-item>
            <div v-if="props.editAdmin">
                <a-form-item
                    :name="['user', 'role']"
                    label="Rol"
                    :rules="[{ required: true }]"
                >
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
                <a-form-item
                    :name="['user', 'contractor']"
                    label="Agencia"
                    :rules="[{ required: true }]"
                >
                    <DropdownContrac
                        v-if="user.role == UserRole.CLIENT"
                        :contractorId="user.contractor"
                        @selected="asignContract"
                    />
                </a-form-item>
            </div>
            <div class="btns">
                <a-button type="primary" :loading="loading" html-type="submit"
                    >Aceptar</a-button
                >
                <a-divider type="vertical" />
                <a-button @click="handleCancel"> Cancelar </a-button>
            </div>
        </a-form>
    </div>
</template>

<script setup lang="ts">
    import { UserReq, UserResponse } from '@/modules/user/types/user.types';
    import { onMounted, PropType, reactive, ref } from 'vue';
    import { editUsers, addUsers } from '../../services/user.service';
    import { UserRole, UserRoleEquivalen } from '@/modules/user/types/user.types';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import { validateMessages } from '@/common/utils/validationMessages';
    import generator from 'generate-password-ts';

    const props = defineProps({
        user: {
            type: Object as PropType<UserResponse>,
            required: true,
        },
        editAdmin: {
            //para saber si un solo user se esta editando el perfil
            type: Boolean,
            required: true,
        },
        newUser: {
            //para saber si es un nuevo user
            type: Boolean,
            required: true,
        },
    });
    const client = ref(true);
    const loading = ref(false);
    
    //     const formState = reactive({
    //     traveler: props.traveler,
    // });
    const user: UserReq = reactive({
        id: props.user.id,
        name: props.user.name,
        email: props.user.email,
        role: props.user.role,
        active: false,
        contractor: props.user.contractors?.[0]?.id,
    });

    const emit = defineEmits<{
        (e: 'finish', visible: boolean): void;
    }>();

    const handleOk = async () => {
        loading.value = true;
        if (props.newUser == true) await addUser();
        else await editUser();
        loading.value = false;
        emit('finish', false);
    };
    onMounted(() => {
        console.log(user);
        console.log(props.user);
    });
    const handleCancel = () => {
        emit('finish', false);
        console.log(user.contractor);
    };
    const editUser = async () => {
        console.log(props.user);
        try {
            await editUsers(user);
            console.log(user);
        } catch (error) {}
    };
    const addUser = async () => {
        genPass();
        try {
            await addUsers(user);
        } catch (error) {}
    };
    const asignContract = (value: any) => {
        user.contractor = value;
        console.log(
            'este es el value :' + value,
            'este es el user.contractor:' + user.contractor,
        );
    };

    //generar una contraseña aleatoria
    const genPass = () => {
        const password = generator.generate({
            length: 10,
            numbers: true,
        });
        user.password = password;
        window.alert('la contraseña momentania sera esta ' + password);
    };
    const onFinishFailed = (values: any) => {
        console.log('tiht', values);
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
