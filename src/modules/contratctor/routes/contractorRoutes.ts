import { UserRole } from '@/helpers/helpers/role.helper';
import { RouteRecordRaw } from 'vue-router';

const contractorsRoutes: RouteRecordRaw[] = [
    {
        path: '/clients/create-clients',
        name: 'create-clients',
        component: () =>
            import('@/modules/contratctor/views/createOrEditContractors.vue'),
        meta: {
            requiresAuth: true,
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
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.COMAGENT],
        },
    },
    {
        path: '/clients/inv',
        name: 'invoicing',
        component: () => import('@/modules/contratctor/views/viewTableFactView.vue'),
        meta: {
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.COMAGENT],
        },
    },
    {
        path: '/clients',
        name: 'clients',
        component: () => import('@/modules/contratctor/views/viewContractorTable.vue'),
        meta: {
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.MARKAGENT],
        },
    },
];
export default contractorsRoutes;
