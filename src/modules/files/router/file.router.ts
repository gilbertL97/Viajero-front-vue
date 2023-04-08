import { UserRole } from '@/helpers/helpers/role.helper';
import { RouteRecordRaw } from 'vue-router';

const filesRoutes: RouteRecordRaw[] = [
    {
        path: '/file',
        name: 'files',
        component: () => import('@/modules/files/views/viewTableFile.vue'),
        meta: {
            role: [UserRole.ADMIN, UserRole.MARKAGENT],
        },
    },
];
export default filesRoutes;
