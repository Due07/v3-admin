/** 单例类 */
export const SingletonClass = <T extends { new (...args: any[]): {} }>(constructor: T) => {
  let instance: InstanceType<T> | void | null = null;

  return class extends constructor {
    constructor(...args: any[]) {
      if (instance) return instance;

      instance = super(...args);;
    }
  };
};

