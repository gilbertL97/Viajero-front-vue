import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import GuestRouter from './guestRoutes';
import TravelersRouter from './travelersRoutes';

const routes: RouteRecordRaw[] = [...TravelersRouter, ...GuestRouter];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
