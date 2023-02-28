import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import travelersRoutes from '@/modules/travelers/routes/travelerRoutes';
import userRoutes from '@/modules/user/routes/userRoutes';
import plainsRoutes from '@/modules/plains/routes/plainsRoutes';
import contractorsRoutes from '@/modules/contratctor/routes/contractorRoutes';
import { UserRole } from '@/helpers/helpers/role.helper';
const store = useAuthStore();
const beforeEnter = (_to: any, _from: any, next: any) => {
    const isloggedIn = store.getToken;
    if (isloggedIn) {
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
            role: [
                UserRole.ADMIN,
                UserRole.CLIENT,
                UserRole.COMAGENT,
                UserRole.CONSULT,
                UserRole.MARKAGENT,
            ],
        },
        beforeEnter,
        children: [
            {
                path: '/users',
                name: 'users',
                component: () => import('@/modules/user/components/table/tableUser.vue'),
                meta: {
                    role: [UserRole.ADMIN],
                },
            },
            {
                path: '/clients',
                name: 'clients',
                component: () =>
                    import('@/modules/contratctor/components/table/tableContractor.vue'),
                meta: {
                    role: [UserRole.ADMIN, UserRole.MARKAGENT],
                },
            },
            {
                path: '/plains',
                name: 'plains',
                component: () =>
                    import('@/modules/plains/components/table/tablePlans.vue'),
                meta: {
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
                path: '/travelers',
                name: 'travelers',
                component: () =>
                    import('@/modules/travelers/view/travelersTableView.vue'),

                meta: {
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
                path: '',
                redirect: '/home',
            },
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/default/backTemp.vue'),
                meta: {
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
        ],
    },
];

export default mainRoutes;
