import { judgmentType } from '@/scripts/base/methods';
import { isReactive, isRef, reactive, ref } from 'vue';

/** 储存初始化数据 */
const weakMap = new WeakMap([]);
/**
 * 重置初始化函数
 * @param {} originData - 传递的数据源, 允许 原始数据 / reactive / ref
 * @returns { T } 传递的数据 -> 将会输出 reactive / ref
 * @returns { Function } 重置初始时数据方法
 */
export const useReset = <T>(originData: T): [T | object, Function] => {
  console.log(originData);
  const copyData = JSON.parse(JSON.stringify(originData));
  const data = handleDataProxy(copyData);
  // console.log(data);

  if (isReactive(data) || isRef(data)) {
    /** 是否储存初始化data */
    if (!weakMap.get(data as object)) {
      const initData = handleDataProxy(copyData);
      weakMap.set(data as object, initData);
    }

  } else { console.log('data is no Proxy'); }

  /** 返回初始化数据 */
  const reset = () => weakMap.get(data as object);
  return [data, reset];
};

/** 处理数据 是否Proxy */
const handleDataProxy = <T>(data: T) => {
  console.log(data);
  if (isReactive(data)) return data;
  if (isRef(data)) return data;

  /** 处理 Array / Object / Function / Symbol */
  switch (judgmentType(data)) {
    case 'Array': return reactive(data as object);
    case 'Object': return reactive(data as object);
    case 'Function': console.warn('function is no Proxy!!!'); return data;
    case 'Symbol': console.warn('Symbol is no Proxy!!'); return data;
    default: return ref(data);
  }
};
