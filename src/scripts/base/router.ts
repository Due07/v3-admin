import { RouteRecordRaw } from 'vue-router';
/**
 * 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param menuList
 */
export const showMenuList = (menuList: RouteRecordRaw[]) => {
  const list = JSON.parse(JSON.stringify(menuList));
  return list.filter((item: RouteRecordRaw) => {
    if (list.children?.length) list.children = showMenuList(list.children);

    return !item.meta?.isHide;
  });
};
