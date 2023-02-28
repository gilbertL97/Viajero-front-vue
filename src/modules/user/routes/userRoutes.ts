import { UserRole } from '@/helpers/helpers/role.helper';
import { RouteRecordRaw } from 'vue-router';

const userRoutes: RouteRecordRaw[] = [
    {
        path: '/user/create-user',
        name: 'create-user',
        component: () => import('@/modules/user/views/createOrEditUser.vue'),
        meta: {
            role: [UserRole.ADMIN],
        },
    },
    {
        path: '/user/edit-user/:id',
        name: 'edit-user',
        component: () => import('@/modules/user/views/createOrEditUser.vue'),
        props: true,
        meta: {
            role: [UserRole.ADMIN],
        },
    },
];
export default userRoutes;
