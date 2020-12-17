# webpack+vue填坑记

## 坑1，webpack插件无效

在B站学习vue开发，发现这个教程在实践时有很多
[使用webpack+vue从零开始打造前端项目(2020最新版),21P的clean-webpack-plugin](https://www.bilibili.com/video/BV157411V7Dh?p=21)

按理说这个插件的执行时间点应该是在webpack打包之前，不应该受plugins顺序的影响，但是事实并非如此，先看我按教程写的插件顺序

```javascript
plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:'./index.html'
        },),
        new CleanWebpackPlugin()
    ],
```

### 问题

package.json片断

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve"
  },
```

执行build开始使用webpack打包

```bash
npm run build
```

发现`CleanWebpackPlugin`并没有生效清除生成目录

### 解决

```javascript
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

## 坑3，merge

```bash
(node:5026) UnhandledPromiseRejectionWarning: TypeError: merge is not a function
```
