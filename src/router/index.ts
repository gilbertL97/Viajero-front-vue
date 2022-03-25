import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from '../components/login/login.vue'
import Home from '../components/home/index.vue'
import {authStore, useAuthStore} from '../store/auth.store'
//const store=await useAuthStore();
const routes :RouteRecordRaw[]=[
{
    path:'/login',
    name :'login',
    component : LoginView,
},/*
{
    path:'/',
    name :'home',
    component :Home,
    beforeEnter:(to,from,next)=>{
        const isAutenticade= store.g;
        if(isAutenticade){
        next();   
        }else
        next({name:'login'});
    }
},*/
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
 
export default router;