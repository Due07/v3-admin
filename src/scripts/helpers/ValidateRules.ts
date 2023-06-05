/**
 * 常规表单校验规则
 */
export type TRulesObj = {test: RegExp, error: string};
export type TRulesKey = 'phone' | 'passportNo' | 'email' | 'idCard' | 'number';

export default class ValidatorRule<T extends string = string> {
    // Record<string, TRulesObj>
    protected formatRules = {
        phone: {test: /^1[3456789]\d{9}$/i, error: '手机号格式有误'},
        passportNo: {test: /^[a-zA-Z0-9]+$/i, error: '护照号格式有误'},
        email: {test: /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/, error: '邮箱格式有误'},
        idCard: {test: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, error: '身份证格式有误'},
        number: {test: /^\d+$/, error: '请填写数字'},
    };

    constructor(rule?: Record<T, TRulesObj>) {
        // Object.assign(this.formatRules, rule ?? {});
        this.formatRules = {...this.formatRules, ...(rule ?? {})};
    }

    get format () {
        return this.formatRules as Record<TRulesKey | T, TRulesObj>;
    }

    /**
     * 常规表单校验模板
     * @param tempValue
     * @returns {Boolean} 返回Boolean
     */
    templateValidatorRule (tempValue: keyof typeof this.formatRules) {
        const { validatorFun } = ValidatorRule;
        const rule = this.formatRules[tempValue];
        return validatorFun(rule);
    }

    /**
     * 验证内容
     * @param tempValue 验证常规模板正则
     * @param value 内容
     * @returns { Boolean } true / false
     */
    validator (tempValue: keyof typeof this.formatRules, value: string): boolean {
        return (this.formatRules[tempValue]?.test ?? /.*/).test(value);
    }

    /**
     * 提供外部自定义正则验证函数
     * @param format {test: '正则表达式', error: '错误文案', required: '是否必填'}
     * @returns {Array}
     */
    static validatorFun(format: {test: RegExp, error: string, required?: Boolean}): Object[] {
        return [
            {
                validator: (rule: any, value: string, callback: Function) => {
                    const {test, error} = format;
                    if (!test.test(value) && value) {
                        callback(new Error(error ?? ''));
                    }
                    callback();
                },
                required: format.required ?? false,
                trigger: ['blur', 'change'],
            },
        ];
    };
}
