import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   meta: {
  //     title: '首页',
  //   },
  //   component: () => import('@/App.vue'),
  // },
  {
    path: '/',
    redirect: {name: 'Home'},
  },
  {
    path: 'home/index',
    name: 'Home',
    redirect(to) {
      console.log(to);
      return to;
    },
    meta: {
      title: '首页',
    },
    component: () => import('@/layouts/index.vue'),
    children: [],
  },
  {
    path: '*',
    redirect: { name: 'Home' },
  },
];

export default createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});
