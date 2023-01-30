import { TAttributeFun } from '../types';
import { stringify } from 'qs';
import HttpServices, { services } from '@/services/HttpServices';
import { handleParameterUrl } from '@/scripts/helpers/decorator/apiRequest';

/**
 * get 请求
 * ```
 *  例1: @Get('/asd', () => {})
 *      getList!: (...args) => Promise<HttpResponseType< xxx >>;

 *  例2: @Get('/asd', (value) => ({params: value}))
 *      getList!: (...args) => Promise<HttpResponseType< xxx >>;
 *      tips: 不传递处理参数方法， 默认获取args[0], 进行发送参数
 * ```
 * @param {String} url 路径
 * @param {Function | undefined} fun 处理参数方法
 * @param {keyof HttpServices} method 使用HttpServices下哪个方法
 * @returns
 */
export const Get: TAttributeFun = (
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
