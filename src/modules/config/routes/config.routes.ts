import { UserRole } from '@/helpers/helpers/role.helper';
import { RouteRecordRaw } from 'vue-router';

const configRoutes: RouteRecordRaw[] = [
    {
        path: '/config',
        name: 'config',
        component: () => import('@/modules/config/views/configViews.vue'),
        meta: {
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.COMAGENT],
        },
    },
];
export default configRoutes;
