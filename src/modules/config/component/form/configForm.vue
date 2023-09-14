<template
    ><a-form :model="config" @finish="editConfig">
        <a-form-item
            has-feedback
            :name="['value']"
            :label="config.key"
            :rules="[{ required: true, min: 4 }]"
        >
            <a-input v-model:value="config.value" @keydown.space.prevent />
        </a-form-item>
        <a-form-item>
            <a-button type="primary" @click="editConfig">Aceptar</a-button>
            <a-divider type="vertical" />
            <a-button @click="handleCancel"> Cancelar </a-button>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">
    import { Config } from '../../types/config.types';
    const props = defineProps<{ config?: Config }>();
    const config = reactive<Config>({
        id: props.config?.id,
        key: props.config?.key,
        value: props.config?.value,
    });
    const editConfig = () => {
        emit('accept', config);
    };
    const handleCancel = () => {
        emit('cancel');
    };
    const emit = defineEmits<{
        (e: 'cancel'): void;
        (e: 'accept', config: Config): void;
    }>();
</script>

<style scoped></style>
