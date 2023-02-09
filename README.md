# Node
版本: v14.18.0

```
// TODO:  loading........
.
│
├── src
│   ├── App.vue
│   │
│   ├── scripts                                     # 一些(公共 / 局部)方法
│   │   ├── base
│   │   │   └── method.ts 
│   │   │
│   │   ├── decorator                               # 装饰器
│   │   │   ├── class                               # 类装饰
│   │   │   ├── method                              # 方法装饰
│   │   │   ├── attribute                           # 属性装饰
│   │   │   └── types.ts                            # 申明类型
│   │   │
│   │   ├── helpers                                 # 工具
│   │   │
│   │   └── plugins                                 # 插件
│   │
│   │
│   ├── services
│   │   ├── base
│   │   │   ├── https.ts                            # 根请求
│   │   │   └── method.ts                           # 拦截方法 可多添加不同拦截方法 extends http.ts 即可
│   │   │
│   │   ├── HttpServices.ts                         # 统一出口
│   │   │
│   │   └── HahaServices.ts                         # 使用案例
│   │
│   └── main.ts
│
├── .prettier.ts
├── .prettierignore
├── .eslintrc.json
├── .eslintignore
├── .env
├── auto-imports.d.ts
├── vite.config.ts
├── tsconfig.json
└── yarn.lock
```

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
