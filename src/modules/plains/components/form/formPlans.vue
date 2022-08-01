<template>
    <div class="form">
        <a-form
            :model="plain"
            :validate-messages="validateMessages"
            @finish="handleOk"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                has-feedback
                :name="['name']"
                label="Nombre"
                :rules="[{ required: true }]"
            >
                <a-input placeholder="Nombre " v-model:value="plain.name" />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['price']"
                label="Precio"
                :rules="[{ required: true }]"
            >
                <a-input-number
                    v-model:value="plain.price"
                    :max="100"
                    :min="0.1"
                    :step="0.1"
                    string-mode
                />
            </a-form-item>
            <a-form-item
                has-feedback
                :name="['price']"
                label="Tarifa alto Riesgo"
                :rules="[{ required: true }]"
            >
                <a-input-number
                    v-model:value="plain.high_risk"
                    :max="100"
                    :min="0.1"
                    :step="0.1"
                    string-mode
                />
            </a-form-item>
            <a-form-item :name="['daily']" label="Diario" :rules="[{ required: true }]">
                <a-checkbox v-model:checked="plain.daily" />
            </a-form-item>

            <a-form-item :name="['isActive']" label="Activo" v-if="props.plain.id != -1">
                <a-checkbox v-model:checked="plain.isActive" />
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
    import { Plans } from '../../types/plains.types';
    import { PropType, reactive, ref } from 'vue';
    import { editPlans, addPlans } from '../../services/plan.service';
    import { validateMessages } from '@/common/utils/validationMessages';
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
    const onFinishFailed = (values: any) => {
        console.log('tiht', values);
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
