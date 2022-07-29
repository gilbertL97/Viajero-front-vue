<template>
    <div class="form">
        
        <h5>Nombre</h5>
        <a-input placeholder="Nombre " v-model:value="plain.name" />
        <h5>Precio</h5>
        <a-input-number
            v-model:value="plain.price"
            :max="100"
            :min="0.1"
            :step="0.1"
            string-mode
        />
        <h5>Tarifa Alto Riesgo</h5>
        <a-input-number
            v-model:value="plain.high_risk"
            :max="100"
            :min="0.1"
            :step="0.1"
            string-mode
        />
        <h5>Diario</h5>
        <a-checkbox v-model:checked="plain.daily" />
        <h5 v-if="props.plain.id != -1">Activo</h5>
        <a-checkbox v-if="props.plain.id != -1" v-model:checked="plain.isActive" />
        <div class="btns">
            <a-button type="primary" :loading="loading" @click="handleOk"
                >Aceptar</a-button
            >
            <a-divider type="vertical" />
            <a-button @click="handleCancel"> Cancelar </a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Plans } from '../../types/plains.types';
    import { PropType, reactive, ref } from 'vue';
    import { editPlans, addPlans } from '../../services/plan.service';

    const props = defineProps({
        plain: {
            type: Object as PropType<Plans>,
            required: true,
        },
    });

    const loading = ref(false);
    const plain: Plans = reactive({
        id: props.plain.id,
        name: props.plain.name,
        price: props.plain.price,
        high_risk: props.plain.high_risk,
        daily: props.plain.daily,
        isActive: props.plain.isActive,
    });

    const emit = defineEmits<{
        (e: 'finish', visible: boolean): void;
    }>();

    const handleOk = async () => {
        loading.value = true;
        if (props.plain.id != -1) await editPlain();
        else await addPlain();
        loading.value = false;
        emit('finish', false);
    };
    const handleCancel = () => {
        emit('finish', false);
        console.log(props.plain.daily);
    };
    const editPlain = async () => {
        console.log(props.plain);
        try {
            await editPlans(plain);
        } catch (error) {}
    };
    const addPlain = async () => {
        try {
            await addPlans(plain);
        } catch (error) {}
    };
</script>

<style lang="scss" scoped>
    .form {
        display: block;
        padding-top: 2px;
        padding-bottom: 3px;
    }
    .btns {
        padding-top: 15px;
    }
</style>
