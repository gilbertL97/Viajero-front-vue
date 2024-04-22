<template>
    <a-select
        v-model:value="contractor.value"
        v-model:label="contractor.label"
        placeholder="Seleccione al cliente"
        :max-tag-count="props.maxTagCount"
        style="width: 200px"
        :options="options"
        :filter-option="filterOption"
        @change="handleChange"
        :mode="props.mode"
    />
</template>
<script lang="ts" setup>
    import { onMounted, ref, reactive, watch } from 'vue';
    import { Contractor } from '../../types/contractor.types';
    import type { SelectProps } from 'ant-design-vue';
    import useHttpMethods from '@/service/useHttpMethods';
    const { get } = useHttpMethods();
    type select = {
        label: string | undefined;
        value: number | number[] | undefined;
    };
    const data = ref<Contractor[]>([]);
    const options = ref<SelectProps['options']>([]);
    const props = defineProps<{
        data:Contractor[];
        contractorId?: number | number[];
        contractor?: string;
        mode?: string;
        activeSelect: boolean;
        maxTagCount?: number;
    }>();

    const contractor = reactive<select>({
        label: '', //props.contractor?.client,
        value: 0, //props.contractor?.id,
    });

    const isloading = ref(false);
    onMounted(async () => {
        isloading.value = true;
        // await refresh();
        asignData();

    });
    const asignData=()=>{
        data.value = props.data;
        options.value = data.value.map((client: Contractor) => ({
            label: client.client,
            value: client.id,
            disabled: !client.isActive,
        }));
        props.activeSelect &&
            (options.value = options.value.filter((cl: { disabled: any; }) => delete cl.disabled));

        isloading.value = false;
        contractor.label = props.contractor!;
        contractor.value = props.contractorId!;
        if (props.mode) contractor.value = [];
    };
    const filterOption = (input: string, options: any) => {
        return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = () => {
        emit('selected', contractor.value);
    };
    const emit = defineEmits<{
        (e: 'selected', contractor: number | number[] | undefined): void;
    }>();
    watch(props, (newProps) => {
        contractor.label = newProps.contractor;
        contractor.value = newProps.contractorId; // terminar y probar  q no hace falta enviar el label solo coon el value
        // adema s q se actualize  las props ss
    });
    watch([()=>props.data],()=>{
        asignData();
    })
</script>
<style scoped>
    .ant-select {
        padding-left: 13px !important;
    }
</style>
