import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store/auth.store';
const store = useAuthStore();
const beforeEnter = (_to: any, _from: any, next: any) => {
    const isAutenticade = store.getToken;
    if (isAutenticade) {
        next();
    } else next({ name: 'login' });
};
const TravelersRouter: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/indexHome.vue'),
        beforeEnter,
        children: [
            {
                path: '/users',
                name: 'users',
                component: () => import('@/modules/user/components/table/tableUser.vue'),
            },
            {
                path: '/clients',
                name: 'clients',
                component: () =>
                    import('@/modules/contratctor/components/table/tableContractor.vue'),
            },
            {
                path: '/plains',
                name: 'plains',
                component: () =>
                    import('@/modules/plains/components/table/tablePlans.vue'),
            },
            {
                path: '/travelers',
                name: 'travelers',
                component: () =>
                    import('@/modules/travelers/components/table/tableTraveler.vue'),
            },
            {
                path: '',
                redirect: '/home',
            },
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/default/backTemp.vue'),
            },
        ],
    },
];

export default TravelersRouter;
