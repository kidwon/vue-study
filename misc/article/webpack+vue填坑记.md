# webpack+vue填坑记


```json
// package.json片断
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve"
  },
```

## 坑1，webpack插件`clean-webpack-plugin`无效

在B站学习vue开发"使用webpack+vue从零开始打造前端项目(2020最新版)",在实践21P的[clean-webpack-plugin](https://www.bilibili.com/video/BV157411V7Dh?p=21)时发现这个插件没有生效清除生成的dist文件夹

按理说这个插件的执行时间点应该是在webpack打包之前，不应该受plugins顺序的影响，但是事实并非如此，先看我按教程写的插件顺序

```javascript
// webpack config 片断
plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:'./index.html'
        },),
        new CleanWebpackPlugin()
    ],
```

### 问题



执行build开始使用webpack打包

```bash
npm run build
```

发现`CleanWebpackPlugin`并没有生效清除生成目录

### 解决

```javascript
// webpack config 片断
plugins:[
        new VueLoaderPlugin(),
        // 调整顺序，先清除
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./index.html'
        },)
    ],
```

## 坑2，webpack-dev-server出错

错误时package.json的配置
```json
// package.json片断
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server"
  },
  "devDependencies": {
    // ...
    "webpack": "^5.10.3",
    "webpack-cli": "^4.2.0",
    // ...
    },
```

### 问题1，报`Cannot find module 'webpack-cli/bin/config-yargs'`错误

执行`start`开始开启webpack-dev-server

```bash
npm run start
```
出现以下错误
```bash
Error: Cannot find module 'webpack-cli/bin/config-yargs'
```

### 解决

参考github的[#2029](https://github.com/webpack/webpack-dev-server/issues/2029)issue发现[这个解决方案](https://github.com/webpack/webpack-dev-server/issues/2029#issuecomment-708351322)
也就是说`webpack-dev-server`
`webpack-cli`版本在`4.x`时用`webpack serve`启动
```json
// package.json片断
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    // 用`webpack serve`启动
    "start": "webpack server"
  },
  "devDependencies": {
    // ...
    "webpack": "^5.10.3",
    // `webpack-cli`版本在`4.x`时
    "webpack-cli": "^4.2.0",
    // ...
    },
```
`webpack-cli`版本在`3.x`时用`webpack-dev-server`启动
```json
// package.json片断
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    // 用`webpack-dev-server`启动
    "start": "webpack-dev-server"
  },
  "devDependencies": {
    // ...
    "webpack": "^5.10.3",
    // `webpack-cli`版本在`3.x`时
    "webpack-cli": "^3.3.12",
    // ...
    },
```
### 问题2 ，`webpack-dev-server`不自动编译更新

### 解决
各种调查之后发现关键的配置是这个webpack里的devServer配置项的watchOptions

```javascript
// webpack 开发环境config片断
    devServer:{
            hot:true,
            // inline:true,
            contentBase: '../dist',
            open: true,
            port:9981,
            // 配置了这个才开始自动更新编译修改内容
            watchOptions:{
                poll:true
            }
        },
```

## 坑4，`merge`

在用`merge`合并webpack配置文件时教程里面的代码已经过时

```javascript
const baseConfig = require('./webpack.base.js')
const merge = require('webpack-merge')
// import webpack

const webpack = require('webpack')

const devConfig = {
    mode:'development',
    devtool:'eval',
    devServer:{
        hot:true,
        // inline:true,
        contentBase: '../dist',
        open: true,
        port:9981,
        watchOptions:{
            poll:true
        }
    },
    // plugin
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
}

module.exports = merge(baseConfig,devConfig)
```

### 问题

执行开发环境测试时会报以下错误

```bash
(node:5026) UnhandledPromiseRejectionWarning: TypeError: merge is not a function
```

### 解决

新版本引用```merge```需要改成

```javascript
    const {merge} = require('webpack-merge')
```