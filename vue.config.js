// eslint-disable-next-line no-unused-vars
const path = require('path');
const debug = process.env.NODE_ENV !== 'rd';
console.log('process.env.ENV:', process.env.ENV);
module.exports = {
    publicPath: '/', // 跟域上下文目录
    outputDir: process.env.ENV === 'qa' ? 'qa' : 'rd', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录（js, css, img, fonts）
    lintOnSave: true, // 是否开启eslint保存检测，有效值 true | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略node_modules, 这里可增加例外的包依赖包名
    productionSourceMap: false,
    configureWebpack: config => {
        // https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            // config.output.filename = 'assets/js/[name].[contenthash:8].min.js';
            // config.output.chunkFilename
            //     = 'assets/js/[name].[contenthash:8].min.js';
        } else {
            // 为开发环境修改配置...
            config.devtool = 'cheap-module-eval-source-map';
        }
    },
    // eslint-disable-next-line no-unused-vars
    chainWebpack: config => {
        // webpack链接API，用户生成和修改webpack配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
        if (debug) {
            // 开发环境配置
        } else {
            // 生产环境配置
        }
    },
    parallel: require('os').cpus().length > 1,
    // pluginsOptions: {
    //   // 第三方插件配置
    // },
    pwa: {
        // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    css: {
        loaderOptions: {
            // eslint-disable-next-line max-len
            // https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: '@import "@/styles/variables.scss";'
            }
        }
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            // 配置跨域
            api: {
                target: 'http://localhost:5000/api/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            [process.env.VUE_APP_BASE_URL]: {
                target: process.env.VUE_APP_BASE_URL,
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    [`^${process.env.VUE_APP_BASE_URL}`]: ''
                }
            }
        }
    }
};
