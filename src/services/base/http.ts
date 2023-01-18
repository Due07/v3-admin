import { stringify } from 'qs';
import Method from './method';

import axios, {
    AxiosError, AxiosRequestConfig, AxiosResponse, Canceler,
} from 'axios';

export default class extends Method {
    http;

    #cancelMap: Map<string, Canceler> = new Map();

    // 是否使用节流
    throttleMap = new Map();

    // TODO: window.vm.$i18n.locale
    private locale(val = 'zh') {
        // console.log('language', val);
        const locale = val;
        return `${locale}-${locale === 'zh' ? 'CN' : locale.toLocaleUpperCase()}`;
    }

    constructor(prefix = '', public showError = true) {
        super();
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

        this.http.interceptors.request.use((config: AxiosRequestConfig) => {
            // 接口节流
            if (this.throttleMap.get(`${config.method}:${config.url}`)) {
                this.removeCancel(config);
                this.appendCancel(config);
            }

            const language = (config.headers as HttpConfigHeaders)['accept-language'];
            (config.headers as HttpConfigHeaders)['accept-language'] = `${
                this.locale(language)
            },zh;q=0.9,en;q=0.8`;

            return config;
        });

        this.http.interceptors.response.use(
            (response: AxiosResponse) => {
                // 拦截未响应的重复请求
                // this.removeCancel(response.config);
                const key = `${response.config.method}:${response.config.url}`;
                if (this.#cancelMap.has(key)) {
                    this.#cancelMap.delete(key);
                    this.throttleMap.delete(key);
                }

                if (response.data.status === 'error') {
                    if (!this.showError) return Promise.reject(response.data);
                    return this.httpErrorHandle(response.data);
                }

                return response.data.data;
            },
            (error: AxiosError) => {
                if (axios.isCancel(error)) {
                    console.error('拦截重复请求', error);
                    return Promise.reject(error);
                }
                if (!this.showError) return Promise.reject(error);

                return this.httpErrorHandle(error);
            },
        );
    }

    private httpErrorHandle(error: AxiosError) {
        switch (Number(error.code)) {
            case 401:
                this.#cancelMap.clear();
                this.throttleMap.clear();
                console.error(error);
                // window.vm.$router.push({name: 'Login'});
                break;
            default:
                if (error.message) {
                    // window.vm.$message.error(error.message);
                }
                break;
        }
        return Promise.reject(error);
    }

    private appendCancel = (config: AxiosRequestConfig): void => {
        const key = `${config.method}:${config.url}`;
        if (!this.#cancelMap.has(key)) {
            // config.cancelToken ||= new axios.CancelToken((cancel) => {
            //     this.cancelMap.set(key, cancel);
            // });
            config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
                this.#cancelMap.set(key, cancel);
            });
        }
    };

    private removeCancel = (config: AxiosRequestConfig): void => {
        const key = `${config.method}:${config.url}`;

        if (this.#cancelMap.has(key)) {
            const cancel = this.#cancelMap.get(key)
                || ((url: string) => console.error('not Function', url));
            cancel(config.url ?? '');
            this.#cancelMap.delete(key);
        }
    };
};
