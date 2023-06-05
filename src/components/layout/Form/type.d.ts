import { TRulesKey, TRulesObj } from '@/scripts/helpers/validateRules';
// 时间
export interface IDate {
    connect?: string;
    rangeSeparator?: string;
    format?: string;
    valueFormat?: string;
    disabledDate?: Function;
    placeholder?: string | string[];
}

export interface ISelectOptions {
    id: number | string;
    name: string;
    disabled?: Boolean;
    value: string | boolean | Number | Object;
}

export type TColumnType = 'text' | 'textarea' | 'password'
| 'number' | 'inputNumber' | 'select'
| 'date' | 'datetime' | 'slot'
| 'components';

export interface IColumn extends IDate {
    name: string;
    value: string;
    type: TColumnType;
    required?: boolean;
    message?: string;
    rules?: Object[];
    ruleType?: TRulesObj | TRulesKey,
    hide?: boolean | Function;
    placeholder?: string;
    bind?: Record<string, any>;
    slot?: string;
    component?: Component;
    blur?: Function;
    change?: Function;
    clearable?: Boolean;
    itemBind?: Record<string, any>;
    disabled?: Boolean;
    readonly?: Boolean;
    filterable?: Boolean;
    remoteMethod?: Function;
    visibleChange?: Function;
    options?: ISelectOptions[];
}
