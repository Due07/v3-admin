import type { TBasicType } from '@/types/scripts/base';
/**
 * 判断类型
 * @param data 数据
 * @param type 判断类型
 * @returns Boolean
 */
export const judgmentType = <T>(data: T, type: TBasicType) => {
    const test = /^\[object +(\S*)+\]$/;
    const typeStr = Reflect.toString.call(data);
    const match = typeStr.match(test);
    return match && match[1] === type;
};

/**
 *  判断是否传入function
 * @param key 键名
 * @param list 数据
 * @param data 参数数组
 * @returns
 */
export const handleFun = <T, K>(key: string, list: T, data: K[]) => {
    if (list && judgmentType(list[key], 'Function')) {
        return list[key].call(undefined, ...data);
    }

    return list[key];
};
