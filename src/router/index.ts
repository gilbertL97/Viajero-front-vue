import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from '../components/login/login.vue'
import Home from '../components/home/index.vue'
import { useAuthStore} from '../store/auth.store'
const store= useAuthStore();

const beforeEnter=(_to: any,_from: any,next: any)=>{
    const isAutenticade= store.getToken;
    if(isAutenticade){
    next();   
    }else
    next({name:'login'});
};
const routes :RouteRecordRaw[]=[
    {
        path:'/',
        name :'home',
        component :Home,
        beforeEnter,
        
    },
    {
    path:'/login',
    name :'login',
    component : LoginView,
},

]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
 

export default router;


