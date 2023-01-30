/**
 * (公共) 方法装饰器
*/
import { TMethodFun } from '../types';

/**
 * 防抖
 * @param delay Number
 * @returns Function
 */

export const Debounce: TMethodFun = (delay = 500) => {
    let timer!: number;
    return (target, key, descriptor) => {
        const fun = descriptor.value;
        if (timer) clearTimeout(timer);

        descriptor.value = function (...args: any[]) {
            timer = setTimeout(() => {
                // fun.call(this, ...args);
                Reflect.apply(fun, this, args);
            }, delay);
        };
    };
};

/**
 * 节流
 * @param delay
 * @return Function
 */
export const Throttle: TMethodFun = (delay = 1200) => {
    let timer: number | undefined;
    return (target, key, descriptor) => {
        const fun = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const newTime = +new Date();
            if (!timer) {
                timer = newTime;
                Reflect.apply(fun, this, args);
            }

            if (newTime - timer > delay) {
                timer = undefined;
            }
        };
    };
};
