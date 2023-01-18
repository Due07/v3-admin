import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '首页',
        },
        component: () => import('@/App.vue'),
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
