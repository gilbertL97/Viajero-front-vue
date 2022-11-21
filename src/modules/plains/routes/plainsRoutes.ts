import { RouteRecordRaw } from 'vue-router';

const plainsRoutes: RouteRecordRaw[] = [
    {
        path: '/plains/create-plains',
        name: 'create-plains',
        component: () => import('@/modules/plains/views/createOrEditPlains.vue'),
    },
    {
        path: '/plains/edit-plains/:id',
        name: 'edit-plains',
        component: () => import('@/modules/plains/views/createOrEditPlains.vue'),
        props: true,
    },
];
export default plainsRoutes;
