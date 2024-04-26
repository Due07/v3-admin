import { ElMessageBox } from 'element-plus';

export const onOut = () => {
  ElMessageBox.confirm(
    '确认退出吗？',
    '提示',
    {
      confirmButtonClass: 'el-button--small',
      confirmButtonText: '确定',
      cancelButtonClass: 'el-button--small',
      cancelButtonText: '取消',
      autofocus: false,
      type: 'warning',
    },
  ).then(() => {
    console.log(111);
  });
};
