import { UserRole } from '@/helpers/helpers/role.helper';
import { RouteRecordRaw } from 'vue-router';

const travelersRoutes: RouteRecordRaw[] = [
    {
        path: '/travelers/:idFile',
        name: 'travelersFile',
        component: () => import('@/modules/travelers/view/travelersTableView.vue'),
        props: true,
        meta: {
            breadcrumbName: 'Ficheros',
            requiresAuth: true,
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.CONSULT,
                UserRole.MARKAGENT,
            ],
        },
    },
    {
        path: '/travelers',
        name: 'travelers',
        component: () => import('@/modules/travelers/view/travelersTableView.vue'),
        meta: {
            breadcrumbName: 'Viajeros',
            requiresAuth: true,
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.CONSULT,
                UserRole.MARKAGENT,
            ],
        },
    },
    {
        path: '/travelers/create-travelers',
        name: 'create-travelers',
        component: () => import('@/modules/travelers/view/createOrEditTravelers.vue'),
        props: true,
        meta: {
            breadcrumbName: 'Agregar Viajeros',
            requiresAuth: true,
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.MARKAGENT,
            ],
        },
    },
    {
        path: '/travelers/edit-travelers/:id',
        name: 'edit-travelers',
        component: () => import('@/modules/travelers/view/createOrEditTravelers.vue'),
        props: true,
        meta: {
            breadcrumbName: 'Editar Viajeros',
            requiresAuth: true,
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.MARKAGENT,
            ],
        },
    },
    {
        path: '/travelers/view-travelers/:id',
        name: 'view-travelers',
        component: () => import('@/modules/travelers/view/viewTravelerInfo.vue'),
        props: true,
        meta: {
            breadcrumbName: 'Ver',
            requiresAuth: true,
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.MARKAGENT,
            ],
        },
    },
    {
        path: '/travelers/create-travelers/upload',
        name: 'upload',
        component: () => import('@/modules/travelers/view/uploadFileView.vue'),
        props: true,
        meta: {
            breadcrumbName: 'Subir Fichero',
            requiresAuth: true,
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.MARKAGENT,
            ],
        },
    },
    {
        path: '/travelers/view-current-travelers/:current',
        name: 'view-current-travelers',
        component: () => import('@/modules/travelers/view/travelersTableView.vue'),
        props: true,
        meta: {
            breadcrumbName: 'Viajeros Vigentes',
            requiresAuth: true,
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.MARKAGENT,
            ],
        },
    },
    {
        path: '/travelers/detail',
        name: 'detailed',
        component: () => import('@/modules/travelers/view/viewTableDetailedTraveler.vue'),
        props: true,
        meta: {
            breadcrumbName: 'Consulta Detallada',
            requiresAuth: true,
            role: [UserRole.ADMIN, UserRole.COMAGENT],
        },
    },
];
export default travelersRoutes;
