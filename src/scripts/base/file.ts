/** 文件方法 */

/**
 * Blob / File 转成base64
 * @param {File} file 上传文件
 * @returns {Promise} base64
 */
export const blobToBase64 = (file: File) => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(file);
  });
};

/**
 * base64 转 File
 * @param {Base64} baseUrl base64
 * @param fileName 文件名称
 * @returns {File} File 文件
 */
export const baseToBlob = (baseUrl: string, fileName: string): File => {
  const arr = baseUrl.split(',');
  const mime = (arr[0].match(/:(.*?);/) ?? { 1: 'png' })[1]; //mime类型 image/png
  const bstr = atob(arr[1]); //base64 解码

  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};
