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
    },
    {
        path: '/travelers/edit-travelers/:id',
        name: 'edit-travelers',
        component: () => import('@/modules/travelers/view/createOrEditTravelers.vue'),
        props: true,
    },
    {
        path: '/travelers/view-travelers/:id',
        name: 'view-travelers',
        component: () => import('@/modules/travelers/view/viewTravelerInfo.vue'),
        props: true,
    },
    {
        path: '/travelers/create-travelers/upload',
        name: 'upload',
        component: () => import('@/modules/travelers/view/uploadFileView.vue'),
        props: true,
    },
];
export default travelersRoutes;
