/** 工具 */
import { Ref, isReactive, isRef } from 'vue';
import { judgmentType } from './methods';

/**
 * 重置reactive所绑定数据
 * @param {Object | Array} originData 原数据
 * @param {T} initData 提供默认数据
 * @returns {void}
 */
export const clearReactive = <T, K>(originData: object | Array<K>, initData?: T): void => {
  if (
    (judgmentType(originData, 'Object') || judgmentType(originData, 'Array'))
    && isReactive(originData)
  ) {
    // 长度都为0
    if (!Object.keys(originData).length && !Object.keys(initData ?? {}).length) {
      return console.warn('length is 0:', originData, initData);
    }
    // 清空数据
    if (judgmentType(originData, 'Array')) {
      // (originData as K[]).length = 0;
      (originData as K[]).splice(0, (originData as K[]).length);
    } else {
      Object.entries(originData).forEach(([key]) => (delete originData[key]));
    }

    // 默认数据提供时
    if (Object.keys(initData ?? {}).length) {
      return Object.entries(initData ?? {}).forEach(([key, value]) => {
        originData[key] = value;
      });
    }

  }
};

type TDeepTarget<T> = Array<T> | string | number | boolean | Object | undefined | null | symbol | Date | RegExp;

/**
 * 深拷贝
 * @param target 目标数据
 * @returns {}
 */
export const deepCopy = <T>(targetValue: TDeepTarget<T>) => {
  const target = isRef(targetValue) ? (targetValue as Ref<TDeepTarget<T>>).value : targetValue;

  const test = /^\[object +(\S*)\]$/;
  const regVal = Reflect.toString.call(target).replace(test, '$1');

  if (['Array', 'Object'].includes(regVal)) {
    const result = regVal === 'Object' ? {} : [];
    Object.entries(target as object | Array<T>).forEach(([key, value]) => {
      if (Reflect.has(target as object | Array<T>, key)) {
        result[key] = deepCopy<typeof value>(value);
      }
    });

    return result;
  }

  switch (regVal) {
    case 'Date':
      return new Date(target as Date);
    case 'RegExp':
      return new RegExp(target as RegExp);
    default:
      // string / boolean / number / undefined / null / symbol / NaN / Infinity / -Infinity
      return target;
  }
};
