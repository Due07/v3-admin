export interface IActions {
  actions: Function;
  plain?: boolean;
  class?: Function | string;
  disabled?: Function | boolean;
  type?: Function | string;
  connect?: string;
  children?: Record<number, IActions>,
};

export interface IList {
  name: string;
  type: 'expand' | 'text' | 'boolean' | 'hash' | 'tagArray'
  | 'date' | 'datetime' | 'image' | 'avatar' | 'slot' | 'actions',
  value: string;

  align?: 'left' | 'center' | 'right';
  size?: number;
  tagSize?: '' | 'large' | 'small',
  itemKey?: string | number,
  itemType?: '' | 'primary' | 'success' | 'info' | 'warning' | 'danger',
  fit?: 'fill' | 'cover' | 'contain' | 'none' | 'scale-down',
  lazy?: boolean;
  bind?: Record<string, any>;
  width?: string;
  formatter?: Function;
  options?: Array<string | number | boolean>;
  actions?: IActions[];
};
