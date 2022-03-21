import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from '../components/login/login.vue'

const routes :RouteRecordRaw[]=[
{
    path:'/',
    name :'login',
    component : LoginView,
},
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
 
export default router;