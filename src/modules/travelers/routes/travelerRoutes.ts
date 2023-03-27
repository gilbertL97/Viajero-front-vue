import { UserRole } from '@/helpers/helpers/role.helper';
import { RouteRecordRaw } from 'vue-router';

const travelersRoutes: RouteRecordRaw[] = [
    // {
    //     path: '/view',
    //     name: 'travelers',
    //     component: () => import('@/modules/travelers/components/view/viewTraveler.vue'),
    // },
    {
        path: '/travelers/create-travelers',
        name: 'create-travelers',
        component: () => import('@/modules/travelers/view/createOrEditTravelers.vue'),
        props: true,
        meta: {
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
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.MARKAGENT,
            ],
        },
    },
    {
        path: '/travelers/view-current-travelers',
        name: 'view-current-travelers',
        component: () => import('@/modules/travelers/view/viewCurrentTravelers.vue'),
        props: true,
        meta: {
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.MARKAGENT,
            ],
        },
    },
];
export default travelersRoutes;
