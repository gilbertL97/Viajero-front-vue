import { UserRole } from '@/helpers/helpers/role.helper';
import { RouteRecordRaw } from 'vue-router';

const contractorsRoutes: RouteRecordRaw[] = [
    {
        path: '/clients/create-clients',
        name: 'create-clients',
        component: () =>
            import('@/modules/contratctor/views/createOrEditContractors.vue'),
        meta: {
            breadcrumbName: 'Agregar Clientes',
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
            breadcrumbName: 'Editar Clientes',
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.COMAGENT],
        },
    },
    {
        path: '/clients/inv',
        name: 'invoicing',
        component: () => import('@/modules/contratctor/views/viewTableFactView.vue'),
        meta: {
            breadcrumbName: 'Facturación Mensual',
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.COMAGENT],
        },
    },
    {
        path: '/clients/policies',
        name: 'policies',
        component: () => import('@/modules/contratctor/views/viewPolicyResume.vue'),
        meta: {
            breadcrumbName: 'Resumen de Pólizas',
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.COMAGENT],
        },
    },
    {
        path: '/clients',
        name: 'clients',
        component: () => import('@/modules/contratctor/views/viewContractorTable.vue'),
        meta: {
            breadcrumbName: 'Clientes',
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.MARKAGENT],
        },
    },
];
export default contractorsRoutes;
