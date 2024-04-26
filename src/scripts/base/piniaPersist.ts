import { PersistedStateOptions } from 'pinia-plugin-persistedstate';

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Storage} storage 存储位置 sessionStorage | localStorage
 * @param {Array} paths 需要持久化的 state name 不传默认全部
 * @return persist
 * */
const piniaPersistConfig = (key: string, storage: Storage = sessionStorage, paths?: string[]) => {
  const persist: PersistedStateOptions = { key, storage, paths };
  return persist;
};

export default piniaPersistConfig;
