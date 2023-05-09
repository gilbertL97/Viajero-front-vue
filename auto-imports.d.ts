export {};
declare global {
    const computed: typeof import('vue')['computed'];
    const ref: typeof import('vue')['ref'];
    const reactive: typeof import('vue')['reactive'];
    const onMounted: typeof import('vue')['onMounted'];
    const provide: typeof import('vue')['provide'];
    const watch: typeof import('vue')['watch'];
}
