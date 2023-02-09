import type { TBasicType } from '@/types/scripts/base';
// elem-plus 中存在dayjs
import dayjs from 'dayjs';
/**
 * 判断类型
 * @param data 数据
 * @param type 判断类型
 * @returns { Boolean }
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

/**
 * 格式化时间
 * 格式 https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * @param row 数据
 * @param {value: string, type: 'date' | 'datetime'} list
 * @param format 格式化格式
 * @returns String / Error
 */
export const formatterData = <
    T, K extends Record<string, any>,
>(row: T, list: K, format?: string) => {
    const handleFormat = format ? format : (
        list.type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss'
    );
    return dayjs(row[list.value]).format(handleFormat);
};
