import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from '../view/HomeView.vue'
import login from '../view/loginView.vue'

const routes :RouteRecordRaw[]=[
    {
    path:'/',
    name :'Home',
    component : HomeView,
},
{
    path:'/login',
    name :'Login',
    component : HomeView,
},
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
 
export default router;