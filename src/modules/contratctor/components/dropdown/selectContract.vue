<template>
    <a-select
        v-model:value="contractor"
        show-search
        placeholder="Seleccione al cliente"
        style="width: 200px"
        :filter-option="filterOption"
        @change="handleChange"
        :loading="isloading"
    >
        <a-select-option v-for="item in data" :key="item.id">{{
            item.client
        }}</a-select-option>
    </a-select>
</template>
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import { getContractors } from '../../services/contractor.service';
    import { Contractor } from '../../types/contractor.types';
    import type { SelectProps } from 'ant-design-vue';
    const data = ref<Contractor[]>([]);
    const props = defineProps<{
        contractor?: Contractor | null;
    }>();
    // const select = ref(props.contractor?.client);

    const contractor = ref(props.contractor!);

    const isloading = ref(false);
    onMounted(async () => {
        isloading.value = true;
        console.log(contractor.value);
        await refresh();
        isloading.value = false;
    });
    const refresh = async () => {
        try {
            data.value = (await getContractors()).data;
        } catch (error) {}
    };
    const filterOption = (input: string, options: any) => {
        return String(options.label).toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = (value) => {
        if (value?.valueOf()) {
            const id2: number = +value?.valueOf();

        

            //  emit('selected', value);
        }
        // const emit = defineEmits<{
        //     (e: 'selected', contractor: Contractor): void;
    }; // }>();
</script>
<style scoped></style>
