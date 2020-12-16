const path = require('path')

// import plugin html-webpack-plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// import plugin html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

// import plugin clean-webpack-plugin,
// ※: the imported plugin is an object,need use {} to resolve
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm

module.exports = {
    mode:'development',
    // pack entry
    entry:'./src/main.js',
    // pack output
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },

    // pack rule
    module:{
        rules:[{
            test:/\.vue$/, 
            loader:'vue-loader'
        },{
            test:/\.(jpg|jpeg|png|svg)$/,
            loader:'url-loader',
            options:{
                name:'[name].[ext]',
                limit:2048
            }
        },{
            test:/\.css$/,
            use:['style-loader','css-loader'] // right -> left ,down -> up
        },{
            test:/\.styl(us)?$/,
            use:[
            'style-loader',
            'css-loader',
            // 'postcss-loader',
            'stylus-loader']
        }]
    },

    // plugin
    plugins:[
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./index.html'
        },)
    ],
    resolve:{
        alias:{
            'vue':'vue/dist/vue.js'
        }
    }

}