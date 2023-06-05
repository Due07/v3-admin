import ValidatorRule from './validateRules';
export default class ATest extends ValidatorRule<'asd'> {
    constructor () {
        super({asd: {test: /^1[3456789]\d{9}$/i, error: '手机号格式有误'}});
        console.log(this.formatRules);
    }
}

// test: 测试用例
// const test = new ATest();
// console.log(test.format);
// const name: keyof typeof test.format = 'asd';
// console.log(name);
