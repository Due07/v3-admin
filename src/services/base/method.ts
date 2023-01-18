import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class {
    get!: <
        T = any,
        R = AxiosResponse<T>,
        D = any,
    >(url: string, config?: AxiosRequestConfig<D>) => Promise<HttpResponseType<R>>;
    delete!: <
        T = any,
        R = AxiosResponse<T>,
        D = any,
    >(url: string, config?: AxiosRequestConfig<D>) => Promise<HttpResponseType<R>>;
    post!: <
        T = any,
        R = AxiosResponse<T>,
        D = any,
    >(url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<HttpResponseType<R>>;
    put!: <
        T = any,
        R = AxiosResponse<T>,
        D = any,
    >(url: string, data?: D, config?: AxiosRequestConfig<D>) => Promise<HttpResponseType<R>>;
    all!: <T>(values: Array<T | Promise<T>>) => Promise<T[]>;
    spread!: <T, R>(callback: (...args: T[]) => R) => (array: T[]) => R;

    constructor() {
        this.get = axios.get;
        this.post = axios.post;
        this.delete = axios.delete;
        this.put = axios.put;
        this.all = axios.all;
        this.spread = axios.spread;
    }
}
