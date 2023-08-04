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
                // dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
                dirs: [],
                // exclude: [/.*\/src\/components\/+.*/],
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
                    rewrite: (rewritePath: string) => rewritePath.replace(/^\/api/, ''),
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
            // target: 'ES2015',
            outDir: 'dist',
            minify: 'esbuild',
            // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
            // minify: "terser",
            // 禁用 gzip 压缩大小报告，可略微减少打包时间
            reportCompressedSize: false,
            // 规定触发警告的 chunk 大小
            chunkSizeWarningLimit: 2000,
            rollupOptions: {
                output: {
                    // Static resource classification and packaging
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                },
            },
        },
    });
};
