import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useRouterStore } from '@/store/state/router';
import { ROUTER_HOME } from '@/config';

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
    redirect: {name: ROUTER_HOME.NAME},
    meta: { isHide: true },
  },
  {
    path: ROUTER_HOME.URL,
    name: ROUTER_HOME.NAME,
    meta: {
      title: '首页',
      icon: 'HomeFilled',
      // isHide: true,x
    },
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '/as',
        name: 'index',
        meta: { title: 'index' },
        component: () => import('@/views/test/index.vue'),
      },
      {
        path: '/aaa',
        name: 'asdhoa',
        meta: { title: 'test1' },
        component: () => import('@/views/test/test1.vue'),
      },
      {
        path: '/bbb',
        name: 'bbb',
        meta: { title: 'test2' },
        component: () => import('@/views/test/test2.vue'),
      },
    ],
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, form, next) => {
  // 路由存储
  const routerStore = useRouterStore();
  if (!routerStore.baseRouter.length) routerStore.getBaseRouter(routes);

  // console.log(to, router.hasRoute(to.name as string));

  if (!router.hasRoute(to.name as string)) {
    console.warn('no router path!', to);
    return next({name: ROUTER_HOME.NAME});
  }

  next();
});

export default router;
