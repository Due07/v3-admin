import { stringify } from 'qs';
import axios,
{ AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';

export default class {
  protected http: AxiosStatic | AxiosInstance;

  get!: <
    T = any, R = AxiosResponse<T>, D = any,
  >(url: string, config?: AxiosRequestConfig<D>) => Promise<HttpResponseType<R>>;
  delete!: <
    T = any, R = AxiosResponse<T>, D = any,
  >(url: string, config?: AxiosRequestConfig<D>) => Promise<HttpResponseType<R>>;
  post!: <
    T = any, R = AxiosResponse<T>, D = any,
  >(url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<HttpResponseType<R>>;
  put!: <
    T = any, R = AxiosResponse<T>, D = any,
  >(url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<HttpResponseType<R>>;
  all!: <T>(values: Array<T | Promise<T>>) => Promise<T[]>;
  spread!: <T, R>(callback: (...args: T[]) => R) => (array: T[]) => R;

  constructor(prefix = '') {
    this.http = axios.create({
      baseURL: prefix,
      withCredentials: true,
      paramsSerializer: {
        encode: (params) => {
          return stringify(params, { arrayFormat: 'repeat' });
        },
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const arr: Array<keyof Omit<IHttpMethod, 'http'>> = [
      'get', 'post', 'delete', 'put', 'all', 'spread',
    ];
    arr.forEach((item: keyof Omit<IHttpMethod, 'http'>) => {
      if (Reflect.has(this.http, item) || Reflect.has(axios, item)) {
        this[item] = this.http[item] ?? axios[item];
      }
    });
  }
}
