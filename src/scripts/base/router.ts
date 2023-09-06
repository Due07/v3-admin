import { isReactive, toRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { judgmentType } from './methods';
import { useUserStore } from '@/store/state/user';
/**
 * 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param menuList
 */
export const showMenuList = (menuList: RouteRecordRaw[] = []): RouteRecordRaw[] => {
  const list = JSON.parse(JSON.stringify(isReactive(menuList) ? toRaw(menuList) : menuList));
  return list.filter((item: RouteRecordRaw) => {
    if (item.children?.length) item.children = showMenuList(item.children);

    return !item.meta?.isHide;
  });
};

/** 权限过滤路由列表 */
export const filterAuthorityList = (menuList: RouteRecordRaw[]) => {
  const list: RouteRecordRaw[] = JSON.parse(JSON.stringify(isReactive(menuList) ? toRaw(menuList) : menuList));
  // console.log(list);
  const userStore = useUserStore();
  const { authorityList } = userStore.user ?? { authorityList: [] };
  // console.log(authorityList);
  return list.filter((item: RouteRecordRaw) => {
    if (item.meta?.power) {
      /** 路由有权限 */
      switch (judgmentType(item.meta.power)) {
        case 'Array': {
          const role = item.meta.power as string[];
          const type = role.some((ite: string) => (authorityList ?? [])?.includes(ite));
          return type;
        }
        case 'String': {
          return (authorityList ?? [])?.includes(item.meta.power as string);
        }
        default:
          return false;
      }
    }
    /** 有children */
    if (item.children && judgmentType(item.children, 'Array')) {
      item.children = filterAuthorityList(item.children);
    }

    /** 路由不需要权限 power === undefined */
    return true;
  }, []);
};
