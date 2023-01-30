/**
 * 处理转化参数url
 * 场景: 装饰器的 get put post delete
 * @param url
 * @param list
 */
export const handleParameterUrl = <T>(url: string, list: Object | Array<T>) => {
    console.log('处理参数url', url, list);

    let parameterUrl = url;
    const test = /:([a-z|A-Z])+/g;
    const parameterArr = url.match(test);

    if (typeof list === 'object' && parameterArr?.length) {
        parameterArr.forEach((item: string) => {
            parameterUrl = parameterUrl.replace(item, `${list[item.replace(':', '')]}`);
        });
    }

    return parameterUrl;
};
