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
export function Get(object: string) {
  // console.log(value);
  return function <T extends { new(...args: any[]): {} }>(target: T) {
    // console.log(target);
    return class extends target {
      // [value]() {
      //     console.log(1);
      // };
      constructor(...args: any[]) {
        super(args);
        console.log(object);
        // for (const key in object) {
        //     if (Object.prototype.hasOwnProperty.call(object, key)) {
        //         const element = object[key];

        //     }
        // }
      }
    };
  };
};
