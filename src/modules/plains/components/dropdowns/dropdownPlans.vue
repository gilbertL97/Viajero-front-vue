<template>
    <a-select
        v-model:value="country"
        show-search
        placeholder="Seleccione el Plan"
        style="width: 200px"
        :options="options"
        :filter-option="filterOption"
        @change="handleChange"
    />
</template>
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import type { SelectProps } from 'ant-design-vue';
    import { Plans } from '../../types/plains.types';
    import { getPlans } from '../../services/plan.service';

    let data = ref<Plans[]>([]);
    const options = ref<SelectProps['options']>([]);
    onMounted(async () => {
        await refresh();

        options.value = data.value.map((plain: Plans) => ({
            label: plain.name,
            value: plain.id,
        }));
    });
    const country = ref<string | undefined>();
    const loading = ref(false);

    const refresh = async () => {
        loading.value = true;
        try {
            data.value = (await getPlans()).data;
        } catch (error) {}
        loading.value = false;
    };
    const filterOption = (input: string, options: any) => {
        return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = (value) => {
        // emit('selected', country.value);
        console.log(country.value, value);
    };
    /*  const emit = defineEmits<{
        (e: 'selected', contractor: string | undefined): void;
    }>();*/
</script>
<style scoped>
    .ant-select {
        padding-left: 13px !important;
    }
</style>
