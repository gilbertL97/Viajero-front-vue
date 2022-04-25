<template>
    <a-layout>
        <header-vue />
        <a-layout>
            <sidebar-index />
            <a-layout-content> <table-user /> </a-layout-content>
        </a-layout>

        <footer-index />
    </a-layout>
</template>
<script lang="ts" setup>
    import tableUser from '../shared/table/table.vue';
    import sidebarIndex from '../shared/sidebar/sidebar.vue';
    import headerVue from '../shared/header/header.vue';
    import footerIndex from '../shared/footer/footer.vue';
</script>
<style scoped></style>
