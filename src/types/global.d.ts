// https://blog.csdn.net/u013727805/article/details/114758672
import { AxiosHeaders, AxiosInstance } from 'axios';

declare global {
  declare class IHttpMethod {
    protected http: AxiosInstance | AxiosStatic;
    get<T>(url: string, params?: unknown): Promise<HttpResponseType<T>>;
    delete<T>(url: string, params?: unknown, options?: unknown): Promise<HttpResponseType<T>>;
    post<T>(url: string, params?: unknown, options?: unknown): Promise<HttpResponseType<T>>;
    put<T>(url: string, params?: unknown, options?: unknown): Promise<HttpResponseType<T>>;
    all<T>(arr: Promise<T>[]): Promise<HttpResponseType<T>>;
    spread<T>(arr: Promise<T>[]): Promise<HttpResponseType<T>>;
  }

  // 全局申明
  declare type HttpConfigHeaders = AxiosHeaders & { 'accept-language': string };

  declare interface HttpResponseType<T> {
    code: number;
    data?: T;
    message: string;
    status: string;
  }

  // namespace Menu {
  //   interface MenuOptions {
  //     path: string,
  //     name: string,
  //     component?: string | (<T>() => Promise<T>),
  //     redirect?: string,
  //     meta: MenuMeta,
  //     children?: MenuOptions[];
  //   }
  //   interface MenuMeta {
  //     title?: string,
  //     icon?: string,
  //     isHide?: boolean
  //   }
  // }
}
