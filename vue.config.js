'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 输出 vue.config.js 配置 vue inspect --mode production > output.js

module.exports = {
  // 输出文件目录
  outputDir: 'dist',
  // 用于嵌套生成的静态资产（js,css,img,fonts）目录
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  publicPath: './',
  // 构建多页时使用
  pages: undefined,
  // eslint-loader是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  // devServer: {
  //   port: 8081,
  //   open: false,
  //   overlay: {
  //     warnings: false,
  //     errors: true
  //   },
  //   proxy: {
  //     // 所有api/开头的转入代理
  //     '/': {
  //       // 要访问接口的地址
  //       // target: 'http://192.168.1.120:9999', // 余乔龙
  //       // target: 'http://47.110.69.252', // 唐百城
  //       target: 'http://sk.zhihuihedao.cn', // 线上地址
  //       changeOrigin: true,
  //       ws: false
  //     }
  //   }
  // },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      return args
    })
    config.resolve.alias.set('@', resolve('src'))
  },
  configureWebpack: {
    name: 'loading'
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: ['element-ui'],
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          // require('precss'),
          // require('autoprefixer'),
          // require('postcss-flexibility')
        ]
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
