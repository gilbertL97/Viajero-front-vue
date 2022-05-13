import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/view/login/loginH.vue';
import Home from '@/view/home/indexHome.vue';
import { useAuthStore } from '@/components/auth/store/auth.store';
const store = useAuthStore();

const beforeEnter = (_to: any, _from: any, next: any) => {
    const isAutenticade = store.getToken;
    if (isAutenticade) {
        next();
    } else next({ name: 'login' });
};
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
