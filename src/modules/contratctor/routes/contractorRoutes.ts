import { UserRole } from '@/helpers/helpers/role.helper';
import { RouteRecordRaw } from 'vue-router';

const contractorsRoutes: RouteRecordRaw[] = [
    {
        path: '/clients/create-clients',
        name: 'create-clients',
        component: () =>
            import('@/modules/contratctor/views/createOrEditContractors.vue'),
        meta: {
            role: [UserRole.ADMIN, UserRole.COMAGENT],
        },
    },
    {
        path: '/clients/edit-clients/:id',
        name: 'edit-clients',
        component: () =>
            import('@/modules/contratctor/views/createOrEditContractors.vue'),
        props: true,
        meta: {
            role: [UserRole.ADMIN, UserRole.COMAGENT],
        },
    },
];
export default contractorsRoutes;
