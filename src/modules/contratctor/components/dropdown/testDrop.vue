<template>
    <a-select
        v-model:value="select"
        show-search
        placeholder="Seleccione al cliente"
        style="width: 200px"
        :filter-option="filterOption"
        @change="handleChange"
        :loading="isloading"
    />
    <a-select-option
        v-for="contractor1 in data"
        :key="contractor1.id"
        :value="contractor1"
    >
        {{contractor1.   }}
    </a-select-option>
</template>
<script lang="ts" setup>
    import { onBeforeMount, reactive, ref } from 'vue';
    import { getContractors } from '../../services/contractor.service';
    import { Contractor } from '../../types/contractor.types';
    import type { SelectProps } from 'ant-design-vue';
    let data = reactive<Contractor[]>([]);
    const options = ref<SelectProps['options']>([]);
    const props = defineProps<{
        contractor?: Contractor;
    }>();
    let select = reactive({
        label: props.contractor?.client,
        value: props.contractor?.id,
    });
    const isloading = ref(false);
    onBeforeMount(async () => {
        isloading.value = true;
        await refresh();
        options.value = data.map((client: Contractor) => ({
            label: client.client,
            value: client.id,
        }));
        //contractor.value = props.contractorId;
        isloading.value = false;
        console.log(props);
    });
    const refresh = async () => {
        try {
            data = (await getContractors()).data;
        } catch (error) {}
    };
    const filterOption = (input: string, options: any) => {
        return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = (value) => {
        console.log(value);
        emit('selected', select.value);
    };
    const emit = defineEmits<{
        (e: 'selected', contractor: number | undefined): void;
    }>();
</script>
<style scoped>
    .ant-select {
        padding-left: 13px !important;
    }
</style>
