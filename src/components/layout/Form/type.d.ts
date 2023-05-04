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

export type TColumnType = 'text' | 'textarea' | 'password' | 'number' | 'inputNumber' | 'select' | 'date' | 'datetime';

export interface IColumn extends IDate {
    name: string;
    value: string;
    type: TColumnType;
    required?: boolean;
    placeholder?: string;
    bind?: Record<string, any>;
    slot?: string;
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
