import { TAttributeFun } from '../types';
import { stringify } from 'qs';
import HttpServices, { services } from '@/services/HttpServices';
import { handleParameterUrl } from '@/scripts/helpers/decorator/apiRequest';

/**
 * get 请求
 * ```
 *  例1: @GetAttribute('/asd', () => {})
 *      getList!: (...args) => Promise<HttpResponseType< xxx >>;

 *  例2: @GetAttribute('/asd/:id', (value) => ({params: value}))
 *      getList!: (...args) => Promise<HttpResponseType< xxx >>;
 *      tips: 不传递处理参数方法， 默认获取args[0], 进行发送参数
 * ```
 * @param {String} url 路径
 * @param {Function | undefined} fun 处理参数方法
 * @param {keyof HttpServices} method 使用HttpServices下哪个方法
 */
export const GetAttribute: TAttributeFun = (
    url: string,
    fun?: Function,
    method: keyof HttpServices = 'HttpClient',
) => (target, key) => {
    // console.log(url, target, key);
    target[key] = function <T>(...args: any[T]) {
        const argResult = (fun === undefined)
            ? {params: args.length ? args[0] : {}}
            : fun(...args);

        return services[method].get(
            // 处理参数路由
            url.includes(':') ? handleParameterUrl(url, argResult.params) : url,
            argResult,
        );
    };
};

/**
 * delete 请求
 * ```
 *  例1: @GetAttribute('/asd', () => {})
 *      getList!: (...args) => Promise<HttpResponseType< xxx >>;

 *  例2: @GetAttribute('/asd/:id', (value) => ({params: value}))
 *      getList!: (...args) => Promise<HttpResponseType< xxx >>;
 *      tips: 不传递处理参数方法， 默认获取args[0], 进行发送参数
 * ```
 * @param {String} url 路径
 * @param {Function | undefined} fun 处理参数方法
 * @param {keyof HttpServices} method 使用HttpServices下哪个方法
 */
export const DeleteAttribute: TAttributeFun = GetAttribute.bind(null);

/**
 * put 请求
 * ```
 *  例1: @PutAttribute('/asd', {data: () => {}, config: () => {}})
 *      getList!: (...args) => Promise<HttpResponseType< xxx >>;
 *
 *  例2: @PutAttribute('/asd/:id', {data: (val) => ({id: val}), config: () => {}})
 *      getList!: (...args) => Promise<HttpResponseType< xxx >>;
 *      tips: data 不传递方法 则默认取 args[0]
 *            config 不传递方法 且 args长度大于2, 则默认取 args 数组的最后一位
 * ```
 * @param {string} url 请求地址
 * @param {{data: Function, config: Function}} fun 处理函数（data / config）
 * @param {keyof HttpServices} method 使用HttpServices下哪个方法
 */
export const PutAttribute: TAttributeFun = (
    url: string,
    fun?: {data: Function, config: Function},
    method: keyof HttpServices = 'HttpClient',
) => (target, key) => {
    // console.log(target, key);

    target[key] = function <T>(...args: any[T]) {
        const argResult = (fun === undefined)
            ? (args.length ? args[0] : {})
            : fun.data(...args);

        const configResult = (fun === undefined)
            ? (args.length > 2 ? args[args.length] : {})
            : (typeof fun.config === 'function') ? fun.config(...args) : {};

        return services[method].put(
            url.includes(':') ? handleParameterUrl(url, argResult) : url,
            argResult,
            configResult,
        );
    };

};

/**
 * post 请求
 * ```
 *  例1: @PutAttribute('/asd', {data: () => {}, config: () => {}})
 *      getList!: (...args) => Promise<HttpResponseType< xxx >>;
 *
 *  例2: @PutAttribute('/asd/:id', {data: (val) => ({id: val}), config: () => {}})
 *      getList!: (...args) => Promise<HttpResponseType< xxx >>;
 *      tips: data 不传递方法 则默认取 args[0]
 *            config 不传递方法 且 args长度大于2, 则默认取 args 数组的最后一位
 * ```
 * @param {string} url 请求地址
 * @param {{data: Function, config: Function}} fun 处理函数（data / config）
 * @param {keyof HttpServices} method 使用HttpServices下哪个方法
 */
export const PostAttribute: TAttributeFun = PutAttribute.bind(null);

/**
 * 导出函数
 * @param route (string)路径
 * @return Function
 */
export const ExportFun: TAttributeFun  = (route: string) => (target, key) => {
    target[key] = <T>(form: T) => {
        const origin = window.location.origin + import.meta.env.VITE_APP_SERVICE_PREFIX;
        const path = stringify(form);
        window.location.href = `${origin}${route}?${path}`;
    };
};
