import { RouteRecordRaw } from 'vue-router';
// import { useAuthStore } from '@/modules/auth/store/auth.store';
import travelersRoutes from '@/modules/travelers/routes/travelerRoutes';
import userRoutes from '@/modules/user/routes/userRoutes';
import plainsRoutes from '@/modules/plains/routes/plainsRoutes';
import contractorsRoutes from '@/modules/contratctor/routes/contractorRoutes';
import { UserRole } from '@/helpers/helpers/role.helper';
import filesRoutes from '@/modules/files/router/file.router';
import configRoutes from '@/modules/config/routes/config.routes';
// const store = useAuthStore();
const beforeEnter = (to: any, _from: any, next: any) => {
    const requiresAuth = to.matched.some(
        (record: { meta: { requiresAuth: any } }) => record.meta.requiresAuth,
    );
    // const isloggedIn = store.isloggedIn;
    if (requiresAuth) {
        next();
    } else {
        next({ name: 'login' });
    }
};
const mainRoutes: RouteRecordRaw[] = [
    {
        path: '/hom',
        name: 'home',
        component: () => import('@/views/home/indexHome.vue'),
        meta: {
            requiresAuth: true,
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.CONSULT,
                UserRole.MARKAGENT,
            ],
        },
        // beforeEnter,
        children: [
            {
                path: '/users',
                name: 'users',
                component: () => import('@/modules/user/components/table/tableUser.vue'),
                meta: {
                    requiresAuth: true,
                    role: [UserRole.ADMIN],
                },
            },
            {
                path: '/plains',
                name: 'plains',
                component: () =>
                    import('@/modules/plains/components/table/tablePlans.vue'),
                meta: {
                    requiresAuth: true,
                    role: [UserRole.ADMIN, UserRole.CLIENT, UserRole.MARKAGENT],
                },
            },
            /*{
                path: '/travelers',
                name: 'travelers',
                component: () =>
                    import('@/modules/travelers/components/table/tableTraveler.vue'),
            },*/
            {
                path: '',
                redirect: '/home',
            },
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/default/backTemp.vue'),
                meta: {
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
            ...travelersRoutes,
            ...userRoutes,
            ...plainsRoutes,
            ...contractorsRoutes,
            ...filesRoutes,
            ...configRoutes,
        ],
    },
];
mainRoutes.forEach((route) => {
    route.beforeEnter = beforeEnter;
});
export default mainRoutes;
