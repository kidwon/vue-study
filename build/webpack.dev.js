const baseConfig = require('./webpack.base.js')
const {merge} = require('webpack-merge')
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