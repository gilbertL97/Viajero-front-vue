import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
//import  path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
/* server: {
    proxy: {
    "/*": {
    target: "http://localhost:3001",
    changeOrigin: true,
    },
    },
    },*/
