import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useRouterStore } from '@/store/state/router';
import { ROUTER_HOME } from '@/config';
import { useGlobalStore } from '@/store/state/GLOBAL';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   meta: {
  //     title: '首页',
  //   },
  //   component: () => import('@/App.vue'),
  // },
  // {
  //   path: '/',
  //   redirect: {name: ROUTER_HOME.NAME},
  //   meta: { isHide: true },
  // },
  {
    path: '/',
    // name: 'LAYOUT',
    meta: {
      title: '首页',
      icon: 'HomeFilled',
      // isHide: true,
    },
    redirect: {name: ROUTER_HOME.NAME},
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: ROUTER_HOME.URL,
        name: ROUTER_HOME.NAME,
        meta: { isHide: true },
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: 'as',
        name: 'index',
        meta: { title: 'index', power: ['test'] },
        component: () => import('@/views/test/index.vue'),
      },
      {
        path: '/form-test',
        name: 'Form.Test',
        meta: { title: 'formTest' },
        component: () => import('@/views/formTest.vue'),
      },
      {
        path: '/form-test-1',
        name: 'Form.Test-1',
        meta: { title: 'formTest-1' },
        component: () => import('@/views/test/formTest-1.vue'),
      },
      {
        path: '/table-form-test',
        name: 'TableForm',
        meta: { title: 'tableForm' },
        component: () => import('@/views/test/tableFormTest.vue'),
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

  /** 动态设置标题 */
  const globalStore = useGlobalStore();
  const title = globalStore.ADMIN_NAME;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  if (!router.hasRoute(to.name as string)) {
    console.warn('no router path!', to);
    return next({name: ROUTER_HOME.NAME});
  }

  next();
});

export default router;
