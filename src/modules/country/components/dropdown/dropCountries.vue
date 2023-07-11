<template>
    <a-select
        v-model:value="country.value"
        v-model:label="country.label"
        show-search
        placeholder="Seleccione el pais"
        style="width: 200px"
        :options="options"
        :filter-option="filterOption"
        @change="handleChange"
    />
</template>
<script lang="ts" setup>
    import type { SelectProps } from 'ant-design-vue';
    import { onBeforeMount } from 'vue';
    import { getCountries } from '../../services/country.services';
    import { Country } from '../../types/country.type';

    type select = {
        label: string;
        value: string;
    };
    const data = ref<Country[]>([]);
    const options = ref<SelectProps['options']>([]);
    const props = defineProps<{
        countryId?: string;
        country?: string;
    }>();
    const country = reactive<select>({
        label: '', //props.country?.comun_name,
        value: '', //props.country?.iso,
    });
    onBeforeMount(async () => {
        await refresh();

        options.value = data.value.map((country: Country) => ({
            label: country.comun_name,
            value: country.iso,
        }));
        country.value = props.countryId!;
        country.label = props.country!;
    });

    const loading = ref(false);

    const refresh = async () => {
        loading.value = true;
        try {
            data.value = (await getCountries()).data;
        } catch (error) {}
        loading.value = false;
    };
    const filterOption = (input: string, options: any) => {
        return options.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const handleChange: SelectProps['onChange'] = () => {
        emit('selected', country.value);
        console.log(country.value);
    };
    const emit = defineEmits<{
        (e: 'selected', country: string): void;
    }>();
    watch(props, (newProps) => {
        country.label = newProps.country!;
        country.value = newProps.countryId!;
    });
</script>
<style scoped>
    .ant-select {
        padding-left: 13px !important;
    }
</style>
