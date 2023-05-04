export const cloumn = [
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
            {id: 3, name: 'ce3', value: '1234', disbaled: true},
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
