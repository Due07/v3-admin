import HttpServices, { services } from '@/services/HttpServices';

/**
 * 类的Get 装饰器
 * TODO: 未完成 待定
 *  ----
 *     想法：传递obj 批量生成
 *     优: 一次性传递obj, 批量生成
 *     缺: 相比较属性装饰器, 需要在类下写出属性名称, 拓展性不大
 *  ----
 * ```
 *  @Get('getList')
 *  class Services {}
 * ```
 * @param object 属性名称
 * @returns
 */
export function Get<T extends { new(...args: any[]): {} }>(object: Record<string, keyof HttpServices>) {
  // console.log(value);
  // <T extends { new(...args: any[]): {} }>
  return function (target: T) {
    // console.log(target);
    return class extends target {
      // [value]() {
      //     console.log(1);
      // };
      constructor(...args: any[]) {
        super(args);
        Object.entries(object).forEach(([key, value]) => {
          this[key] = function () {
            return services[value].get('/asd');
          };
        });
      }
    };
  };
};
