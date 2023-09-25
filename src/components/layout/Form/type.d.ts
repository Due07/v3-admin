import { TRulesKey, TRulesObj } from '@/scripts/helpers/validateRules';
import type { IColumn as IFileColumn, IFileUploadProps } from '@/components/widget/FileUpload/type';
// 时间
export interface IDate {
  connect?: string;
  rangeSeparator?: string;
  format?: string;
  valueFormat?: string;
  disabledDate?: Function;
}

export interface ISelectOptions {
  id: number | string;
  name: string;
  disabled?: boolean;
  value: string | boolean | Number | Object;
}

export type TColumnType = 'text' | 'textarea' | 'password'
| 'number' | 'inputNumber' | 'select'
| 'date' | 'datetime' | 'slot'
| 'components' | 'file';

export interface IColumn extends IFileColumn, IFileUploadProps, IDate {
  name: string;
  value: string;
  type: TColumnType;
  required?: boolean;
  message?: string;
  rules?: Object[];
  ruleType?: TRulesObj | TRulesKey,
  hide?: boolean | Function;
  // placeholder?: string;
  placeholder?: string | string[];
  bind?: Record<string, any>;
  slot?: Component;
  component?: Component;
  blur?: Function;
  change?: Function;
  clearable?: boolean;
  itemBind?: Record<string, any>;
  disabled?: boolean;
  readonly?: boolean;
  filterable?: boolean;
  remoteMethod?: Function;
  visibleChange?: Function;
  options?: ISelectOptions[];
}
