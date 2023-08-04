import { IProps } from './index.vue';

/**
 * @param accept 上传类型
 * @param multiple 是否多选
 */
export interface Input {
    accept: string,
    // disabled: boolean,
    multiple: boolean,
}
export interface IColumn {
    value: string;
    fileType?: 'image' | 'video' | 'audio' | 'file',
}

export interface IFileObj {
    name: string;
    file: File;
    link?: string;
    type?: 'success' | 'info' | 'warning' | 'danger' | '';
}

export interface IFileUploadProps extends Omit<IProps, 'column' | 'formData'> {}
