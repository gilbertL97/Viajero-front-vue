import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import GuestRouter from './guestRoutes';
import mainRoutes from './mainRoutes';

const routes: RouteRecordRaw[] = [...mainRoutes, ...GuestRouter];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
