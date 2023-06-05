import { IColumn } from './type';

export const column: IColumn[] = [
    {
        name: 'component组件',
        type: 'components',
        value: 'components',
        component: (prop: Record<'i'|'form', any>) => {
            return (<>
                {JSON.stringify(prop.i)}
                {JSON.stringify(prop.form)}
            </>);
        },
    },
    {
        name: 'ce 插槽',
        type: 'slot',
        value: 'ce',
    },
    {
        name: 'ID',
        type: 'text',
        value: 'id',
        readonly: true,
    },
    {
        name: '名称',
        type: 'text',
        value: 'name',
        // ruleType: 'phone',
        // required: true,
        // message: '请填写名称',
    },
    {
        name: '创建时间',
        type: 'date',
        value: 'createTime',
    },
    {
        name: '登录时间',
        type: 'datetime',
        value: 'endTime',
    },
    {
        name: '类型',
        type: 'select',
        value: 'type',
        options: [
            {id: 1, name: 'ce1', value: '12'},
            {id: 2, name: 'ce2', value: '123'},
            {id: 3, name: 'ce3', value: '1234', disabled: true},
        ],
    },
];

export const formData = {
    id: 1,
    name: 'wanwan',
    weight: 3,
    createTime: 1680166280663,
    endTime: 1680166280663,
    prive: 2.2,
    type: '12',
};
