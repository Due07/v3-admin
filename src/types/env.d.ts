// env变量
declare interface ImportMetaEnv {
  readonly VITE_APP_SERVICE_PREFIX: string; // server的 prefix
  readonly VITE_APP_SERVICE_URL: string; // server 的根地址
  readonly VITE_APP_BASE_URL: number; // dev 地址
  readonly VITE_APP_PORT: number; // 端口
}
