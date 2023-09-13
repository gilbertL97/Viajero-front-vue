<template>
    <a-form-item
        has-feedback
        :name="['file']"
        :label="config.key"
        :rules="[{ required: true, min: 4 }]"
    >
        <a-input v-model:value="config.value" @keydown.space.prevent />
        <a-form-item>
            <a-button type="primary" html-type="submit">Aceptar</a-button>
            <a-divider type="vertical" />
            <a-button @click="handleCancel"> Cancelar </a-button>
        </a-form-item>
    </a-form-item>
</template>

<script setup lang="ts">
    import { Config } from '../../types/config.types';
    const props = defineProps<{ config: Config }>();
    const config = reactive<Config>({
        key: undefined,
        value: undefined,
    });
    const editContractor = (id: number) => {
        emit('update', id);
    };
    const emit = defineEmits<{
        (e: 'cancel', deleted: number): void;
        (e: 'accept', deleted: number): void;
    }>();
</script>

<style scoped></style>
