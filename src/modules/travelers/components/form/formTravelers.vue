<template>
    <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onFinish"
    >
        <a-form-item
            has-feedback
            :name="['traveler', 'name']"
            label="Nombre y Apellidos"
            :rules="[{ required: true }]"
        >
            <a-input v-model:value="formState.traveler.name" />
        </a-form-item>
        <a-form-item
            :name="['traveler', 'email']"
            label="Email"
            :rules="[{ type: 'email' }]"
        >
            <a-input v-model:value="formState.traveler.email" />
        </a-form-item>
        <a-form-item label="Sexo">
            <a-radio-group v-model:value="formState.traveler.sex">
                <a-radio value="F">Masculino</a-radio>
                <a-radio value="M">Femenino</a-radio>
            </a-radio-group>
            <a-form-item
                has-feedback
                :name="['traveler', 'passport']"
                label="Pasaporte"
                :rules="[{ required: true }]"
            >
                <a-input v-model:value="formState.traveler.passport" />
            </a-form-item>
        </a-form-item>
        <a-form-item name="date-pickerSales" label="Fecha de Venta">
            <a-date-picker
                v-model:value="formState.traveler.sale_date"
                value-format="YYYY-MM-DD"
            />
        </a-form-item>
        <a-form-item name="dropdownClient" label="Agencia">
            <dropdownContrac @selected="asignClient" />
        </a-form-item>

        <a-form-item name="date-pickerBecome" label="Fecha de Inicio de Viaje">
            <a-date-picker
                v-model:value="formState.traveler.start_date"
                value-format="YYYY-MM-DD"
                :rules="[{ required: true }]"
            />
        </a-form-item>
        <a-form-item name="date-pickerEnd" label="Fecha de Fin de Poliza">
            <a-date-picker
                v-model:value="formState.traveler.start_date"
                value-format="YYYY-MM-DD"
                :rules="[{ required: true }]"
            />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
    import { onMounted, reactive } from 'vue';
    import { Traveler } from '../../types/type.traveler';
    import dropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    const props = defineProps<{
        id?: string;
        traveler: Traveler;
    }>();
    const formState = reactive({
        traveler: props.traveler,
    });
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
    };
    onMounted(async () => {
        if (props.id) {
            await refresh();
        }
    });
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
            date: 'Please select time!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const asignClient = (idContractor: number | undefined) => {
        formState.traveler.contractor = idContractor!;
    };

    async function refresh() {
        throw new Error('Function not implemented.');
    }
</script>
