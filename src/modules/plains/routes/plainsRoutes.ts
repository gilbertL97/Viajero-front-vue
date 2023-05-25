import { UserRole } from '@/helpers/helpers/role.helper';
import { RouteRecordRaw } from 'vue-router';

const plainsRoutes: RouteRecordRaw[] = [
    {
        path: '/plains/create-plains',
        name: 'create-plains',
        component: () => import('@/modules/plains/views/createOrEditPlains.vue'),
        meta: {
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.MARKAGENT],
        },
    },
    {
        path: '/plains/edit-plains/:id',
        name: 'edit-plains',
        component: () => import('@/modules/plains/views/createOrEditPlains.vue'),
        props: true,
        meta: {
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.MARKAGENT],
        },
    },
];
export default plainsRoutes;
