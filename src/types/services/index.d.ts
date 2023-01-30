import {
    AxiosHeaders, AxiosStatic,
    // AxiosError, AxiosInstance, AxiosRequestConfig, Canceler,
} from 'axios';

declare global {
    // 全局申明
    type HttpConfigHeaders = AxiosHeaders & {'accept-language': string};

    interface HttpResponseType<T> {
        code: number;
        data?: T;
        message: string;
        status: string;
    }

    // declare class 定义全局类。只能定义类型
    // class Http {
    //     #cancelMap: Map<string, Canceler>;

    //     showError: boolean;

    //     throttleMap: Map<string, boolean>;

    //     private locale: (value: string) => string;

    //     private httpErrorHandle(error: AxiosError): void;

    //     private appendCancel(config: AxiosRequestConfig): void;

    //     private removeCancel(config: AxiosRequestConfig): void;

    //     constructor(prefix: string, showError?: boolean);
    // }
}
declare class IHttpMethod {
    protected http: AxiosInstance | AxiosStatic;
    get<T>(url: string, params?: unknown): Promise<HttpResponseType<T>>;
    delete<T>(url: string, params?: unknown, options?: unknown): Promise<HttpResponseType<T>>;
    post<T>(url: string, params?: unknown, options?: unknown): Promise<HttpResponseType<T>>;
    put<T>(url: string, params?: unknown, options?: unknown): Promise<HttpResponseType<T>>;
    all<T>(arr: Promise<T>[]): Promise<HttpResponseType<T>>;
    spread<T>(arr: Promise<T>[]): Promise<HttpResponseType<T>>;
}
