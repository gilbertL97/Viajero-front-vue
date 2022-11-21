import { RouteRecordRaw } from 'vue-router';
const GuestRouter: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/loginH.vue'),
    },

    {
        // 404 cuando no matchea
        path: '/404',
        name: 'error-404',
        component: () => import('@/views/errors/ErrorPag.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
    {
        path: '/',
        redirect: '/login',
    },
];
export default GuestRouter;
