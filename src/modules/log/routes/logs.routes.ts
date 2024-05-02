import { UserRole } from '@/helpers/helpers/role.helper';
import { RouteRecordRaw } from 'vue-router';

const logsRoutes: RouteRecordRaw[] = [{
    path: '/logs',
    name: 'view-logs',
    component: () => import('@/modules/log/views/viewAllLogs.vue'),
    meta: {
        breadcrumbName: 'Registros del Sistema',
        requiresAuth: true,
        role: [
            UserRole.ADMIN,
            UserRole.CLIENT,
            UserRole.COMAGENT,
            UserRole.CONSULT,
            UserRole.MARKAGENT,
        ],
    },
}];
export default logsRoutes;