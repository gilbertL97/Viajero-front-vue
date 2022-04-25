<template>
    <div>
        <h5>Nombre</h5>
        <a-input placeholder="Nombre " :defaultValue="userEdit.name" />
        <h5>Correo</h5>
        <a-input placeholder="Email" :defaultValue="userEdit.email" />
        <h5>Rol : {{ userEdit.role }}</h5>
        <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
                <h5>{{ role }}</h5>
                <DownOutlined />
            </a>
            <template #overlay>
                <a-menu>
                    <a-menu-item key="marketing"> Administrador </a-menu-item>
                    <a-menu-item key="consult"> Consultante </a-menu-item>
                    <a-menu-item key="client">
                        Agente de Marketing
                    </a-menu-item>
                    <a-menu-item key="comercial">
                        Agente de Viajes
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup lang="ts">
    import { User } from '@/components/entities/user/types/modelTypes';
    import { DownOutlined } from '@ant-design/icons-vue';
    import { PropType, reactive, ref } from 'vue';
    const role = ref<String>(' ');
    /*const user =reactive<User>(
 );*/

    const props = defineProps({
        user: {
            type: Object as PropType<User>,
            required: true,
        },
    });
    const userEdit = reactive({
        name: props.user.name,
        email: props.user.email,
        role: props.user.role,
    });
    /* const emit = defineEmits<{
        (e: 'change', visible: boolean): void;
        (e: 'update', user: User): void;
    }>();
    const userUpdt = computed<User>(() => {
        // type error if this doesn't return a number
        return props.user;
    });

    /*const handleCancel = () => {
      visible = false;
    };*/
</script>

<style lang="scss" scoped></style>
