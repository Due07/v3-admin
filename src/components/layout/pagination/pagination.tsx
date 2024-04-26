import { ElPagination } from 'element-plus';
import { useGlobalStore } from '@/store/state/GLOBAL';

interface Ipagination {
  size: number;
  page: number;
  total?: number;
  pageSizes?: number[];
}
// https://element-plus.gitee.io/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7
/**
 * @param {Ipagination} prop 👇
 * ```typescript
 * prop = {
 *   size: 10,
 *   total: 0,
 *   page: 10,
 *   pageSizes?: [10, 20, 50],
 * }
 * ```
 */
export default (prop: Ipagination) => {
  const pagin: Ipagination = {
    size: prop.size ?? 10,
    total: prop.total ?? 0,
    page: prop.page ?? 1,
    pageSizes: prop.pageSizes ?? [10, 20, 50],
  };
  return (
    <ElPagination
      small={useGlobalStore().SIZE === 'small'}
      background={true}
      hide-on-single-page={true}
      layout="sizes, prev, pager, next, total, jumper"
      v-models={[
        [pagin.size, 'pageSize'],
        [pagin.total, 'total'],
        [pagin.page, 'pageCount'],
        [pagin.pageSizes, 'pageSizes'],
      ]}
    />
  );
};
