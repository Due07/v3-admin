import { judgmentType } from '@/scripts/base/methods';
import { isReactive, isRef, reactive, ref } from 'vue';

/**
 * 重置初始化函数
 * @param {} originData - 传递的数据源, 允许 原始数据 / reactive / ref
 * @returns { T } 传递的数据 -> 将会输出 reactive / ref
 * @returns { Function } 重置初始时数据方法
 */
export const useReset = <T>(originData: T): [T | object, Function] => {
  console.log(originData);
  const data = handleDataProxy(originData);
  console.log(data);

  return [data, () =>{}];
};

/** TODO: doing~ 未完成 */
const handleDataProxy = <T>(data: T) => {
  console.log(data);
  if (isReactive(data)) return data;
  if (isRef(data)) return data;

  switch (judgmentType(data)) {
    case 'Array':
      return reactive(data as object);
    case 'Object':
      return reactive(data as object);
    case 'Function':
      console.warn('function is no Proxy!!!');
      return data;
    default:
      return ref(data);
  }
};
