<template>
    <a-select
        v-model:value="country"
        show-search
        placeholder="Seleccione el pais"
        style="width: 200px"
        :options="options"
        :filter-option="filterOption"
        @change="handleChange"
    />
</template>
<script lang="ts" setup>
    import { onBeforeMount, reactive, ref } from 'vue';
    import type { SelectProps } from 'ant-design-vue';
    import { getCountries } from '../../services/country.services';
    import { Country } from '../../types/country.type';

    let data = reactive<Country[]>([]);
    const options = ref<SelectProps['options']>([]);
    const country = ref<string | undefined>();
    const props = defineProps<{
        iso?: string;
    }>();
    onBeforeMount(async () => {
        await refresh();

        options.value = data.map((country: Country) => ({
            label: country.comun_name,
            value: country.iso,
        }));
        country.value = props.iso;
        console.log(country.value);
    });

    const loading = ref(false);

    const refresh = async () => {
        loading.value = true;
        try {
            data = (await getCountries()).data;
        } catch (error) {}
        loading.value = false;
    };
    const filterOption = (input: string, options: any) => {
        return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = () => {
        emit('update:country', country.value);
    };

    const emit = defineEmits(['update:country']);
</script>
<style scoped>
    .ant-select {
        padding-left: 13px !important;
    }
</style>
