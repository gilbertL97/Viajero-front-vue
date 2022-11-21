import { RouteRecordRaw } from 'vue-router';

const contractorsRoutes: RouteRecordRaw[] = [
    {
        path: '/clients/create-clients',
        name: 'create-clients',
        component: () =>
            import('@/modules/contratctor/views/createOrEditContractors.vue'),
    },
    {
        path: '/clients/edit-clients/:id',
        name: 'edit-clients',
        component: () =>
            import('@/modules/contratctor/views/createOrEditContractors.vue'),
        props: true,
    },
];
export default contractorsRoutes;
