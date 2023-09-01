import { isReactive, toRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
/**
 * 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param menuList
 */
export const showMenuList = (menuList: RouteRecordRaw[] = []) => {
  const list = isReactive(menuList) ? toRaw(menuList) : menuList;
  return list.filter((item: RouteRecordRaw) => {
    if (item.children?.length) item.children = showMenuList(item.children);

    return !item.meta?.isHide;
  });
};

// TODO: 权限过滤路由列表
// export const filterAuthorityList = (menuList: RouteRecordRaw[]) => {
//   const list = isReactive(menuList) ? toRaw(menuList) : menuList;

// };
