/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import Autoimport from 'unplugin-auto-import/vite';
//import  path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Autoimport({
            dts: false,
            imports: ['vue'],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
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
