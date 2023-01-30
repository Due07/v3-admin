// import { VNode } from 'vue';

export type TClass = (target: Function) => void;

export type TMethod = <T>(
    // target: VNode,
    target: T,
    key: string,
    descriptor: PropertyDescriptor,
) => void;

export type TMethodFun = <K>(...args: any[K]) => TMethod;

/**
 * 属性申明
 */

export type TAttribute = <T>(target: T, key: string) => void;

export type TAttributeFun = <T>(...args: any[T]) => TAttribute;
