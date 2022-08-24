import { RouteRecordRaw } from 'vue-router';

const userRoutes: RouteRecordRaw[] = [
    {
        path: '/user/create-user',
        name: 'create-user',
        component: () => import('@/modules/user/views/createOrEditUser.vue'),
    },
    {
        path: '/user/edit-user/:id',
        name: 'edit-user',
        component: () => import('@/modules/user/views/createOrEditUser.vue'),
        props: true,
    },
];
export default userRoutes;
