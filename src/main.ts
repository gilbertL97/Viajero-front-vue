import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//import { useAcl } from 'vue-simple-acl'; //plugin para el control de acceso y roles
const pinia = createPinia();
createApp(App).use(Antd).use(pinia).use(router).mount('#app');
