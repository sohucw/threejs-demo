# vue-template

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 环境变量 && rd / qa

-   [https://cli.vuejs.org/zh/guide/mode-and-env.html](https://cli.vuejs.org/zh/guide/mode-and-env.html)

### 给打包后的文件添加 .min.js 后缀

-   [参考文档 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F](https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F)

### 查看 webpack 配置

生成 production 的 webpack 配置文件

```bash
    $ vue inspect > output.js --mode rd

```

生成 development 的 webpack 配置文件

```bash
    $ vue inspect > output.js

```

### 代码结构 & 代码风格

-   1. 页面组件入口组件小写开头，多个单词使用`-`隔开 比如：hello-world.vue index.vue
-   2. 其他组件一律大驼峰命名 比如：HelloWorld.vue

```
    components 可复用，公共组件
        Demo/index.vue
    views 所有页面组件
        home/index.vue 页面入口组件
        home/detail.vue 详情页面组件
        home/components 页面结构组件
            DemoXxx1.vue
            DemoXxx2.vue
            DemoXxx3.vue

```

-   3. 其他，请参考 Vue 官方推荐的[风格指南--Vue.js](https://cn.vuejs.org/v2/style-guide/)

### core-js 模块错误

运行项目 出现一下错误

```bash
 ERROR  Failed to compile with 3 errors                                                                                                                        13:12:07

These dependencies were not found:

* core-js/modules/es6.object.keys in ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-loader@8.0.6@babel-loader/lib!./node_
modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.1@vue-loader/lib??vue-loader-options!./src/views/demo/index.vue?vue&type
=script&lang=js&
* core-js/modules/es7.object.get-own-property-descriptors in ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-loader@8.0.6@
babel-loader/lib!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.1@vue-loader/lib??vue-loader-options!./src/views
/demo/index.vue?vue&type=script&lang=js&
* core-js/modules/web.dom.iterable in ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-loader@8.0.6@babel-loader/lib!./node
_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.1@vue-loader/lib??vue-loader-options!./src/views/demo/index.vue?vue&typ
e=script&lang=js&

To install them, you can run: npm install --save core-js/modules/es6.object.keys core-js/modules/es7.object.get-own-property-descriptors core-js/modules/web.dom.iterab
le

```

[解决办法 - github issues](https://github.com/vuejs/vue-cli/issues/3678)

```js
// babel.config.js;

presets: [['@vue/app', {useBuiltIns: 'entry'}]];
```

### sass-loader 升级到 8.0.0 之后不兼容 问题

错误如下，解决方法，将 sass-loader 版本控制为 7.1.0
[github issues](https://github.com/JeffreyWay/laravel-mix/issues/2206)

```bash
    $ npm uninstall --save-dev sass-loader
    $ npm install --save-dev sass-loader@7.1.0
```

```bash
             12:53:11

 error  in ./src/styles/variables.scss

Module build failed (from ./node_modules/_sass-loader@8.0.0@sass-loader/dist/cjs.js):
ValidationError: Invalid options object. Sass Loader has been initialised using an options object that does not match the API schema.
 - options has an unknown property 'data'. These properties are valid:
   object { implementation?, sassOptions?, prependData?, sourceMap?, webpackImporter? }
    at validate (/Users/v_lishaohai/Desktop/work/baidu/uuap-mail-admin-app/node_modules/_schema-utils@2.2.0@schema-utils/dist/validate.js:49:11)
    at Object.loader (/Users/v_lishaohai/Desktop/work/baidu/uuap-mail-admin-app/node_modules/_sass-loader@8.0.0@sass-loader/dist/index.js:36:28)

 @ ./src/styles/variables.scss 4:14-285 14:3-18:5 15:22-293
 @ ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-loader@8.0.6@babel-loader/lib!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref
--0-0!./node_modules/_vue-loader@15.7.1@vue-loader/lib??vue-loader-options!./src/views/layout/index.vue?vue&type=script&lang=js&
 @ ./src/views/layout/index.vue?vue&type=script&lang=js&
 @ ./src/views/layout/index.vue
 @ ./src/router/index.js
 @ ./src/main.js
 @ multi ./node_modules/_webpack-dev-server@3.8.1@webpack-de

```
