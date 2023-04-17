import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import Autoimport from 'unplugin-auto-import/vite';
//import  path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Autoimport({
            dts: true,
        }),
    ],
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
