import { isReactive } from 'vue';
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
      (originData as Array<K>).length = 0;
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
