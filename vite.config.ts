import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// 打包分析
// import { visualizer } from 'rollup-plugin-visualizer';

import eslintPlugin from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
    const ENV = loadEnv(mode, process.cwd());
    return defineConfig({
        envDir: path.resolve(__dirname, './env'),
        resolve: {
            //设置别名
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        plugins: [
            vue({
                reactivityTransform: true, // 响应性语法糖
            }),
            vueJsx({}),
            // eslint 自动校验
            eslintPlugin({
                exclude: ['/node_modules'],
                cache: false,
            }),
            // 按需加载
            autoImport({
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
            }),
            components({
                resolvers: [
                    ElementPlusResolver(),
                    // 自动注册图标组件
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                ],
            }),
            Icons({
                autoInstall: true,
            }),
            // visualizer(),
        ],
        server: {
            cors: true, // 默认启动，允许任何源
            // open: true, // 自动打开
            port: Number(ENV.VITE_APP_PORT) || 5173, //启动端口
            hmr: {
                // host: '127.0.0.1',
                host: ENV.VITE_APP_BASE_URL,
            },
            // 设置 https 代理
            proxy: {
                '/api': {
                    // url
                    target: ENV.VITE_APP_SERVICE_URL,
                    changeOrigin: true,
                    // eslint-disable-next-line no-shadow
                    rewrite: (path: string) => path.replace(/^\/api/, ''),
                },
            },
        },
        // 全局注入 样式文件
        css: {
            preprocessorOptions: {
                scss: {
                    // http://events.jianshu.io/p/4918f8d9f2b4
                    // additionalData:'@import "@/assets/style/mian.scss";'
                    additionalData: '@import "@/assets/styles/index.scss";',
                },
            },
            postcss: {
                plugins: [
                    tailwindcss,
                    autoprefixer,
                ],
            },
        },
        build: {
            target: 'ES2015',
        },
    });
};
