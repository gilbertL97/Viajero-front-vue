<template>
    <h2>Subir Archivos Excel o CSV</h2>
    <div class="header-page">
        <h4> Seleccione la Agencia :</h4>
        <DropdownContrac @selected="asignContract" :active-select="true" />
    </div>
    <div>
        <UploadFiles :contractor="contractor" @header="showTable" />
    </div>
    <div>
        <TableTraveler />
    </div>
</template>

<script setup lang="ts">
    import UploadFiles from '@/modules/travelers/components/uploadFiles/uploadFiles.vue';
    import DropdownContrac from '@/modules/contratctor/components/dropdown/dropdownContrac.vue';
    import { ref } from 'vue';
    import TableTraveler from '../components/table/tableTraveler.vue';
    const contractor = ref();
    const asignContract = (value: any) => {
        contractor.value = value;
        console.log('este es la agencia :' + value);
    };
    
    const showTable = (stat: number) => {
        console.log('este es l numero de la peticion ' + stat);
    };
</script>

<style scoped>
    .header-page {
        display: inline-flex;
        padding-bottom: 2rem;
    }
</style>
