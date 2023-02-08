import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import travelersRoutes from '@/modules/travelers/routes/travelerRoutes';
import userRoutes from '@/modules/user/routes/userRoutes';
import plainsRoutes from '@/modules/plains/routes/plainsRoutes';
import contractorsRoutes from '@/modules/contratctor/routes/contractorRoutes';
const store = useAuthStore();
const beforeEnter = (_to: any, _from: any, next: any) => {
    const isAutenticade = store.getToken;
    if (isAutenticade) {
        next();
    } else {
        console.log(isAutenticade);
        next({ name: 'login' });
    }
};
const mainRoutes: RouteRecordRaw[] = [
    {
        path: '/hom',
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
            ...travelersRoutes,
            ...userRoutes,
            ...plainsRoutes,
            ...contractorsRoutes,
        ],
    },
];

export default mainRoutes;
