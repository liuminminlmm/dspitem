//这个js是用来提取webapck中的公共代码
const path = require('path');
const webpack = require('webpack');
//实现css的抽离的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//当前根路径
// console.log(process.cwd());
module.exports = {
    entry: {
        bundle: path.resolve(process.cwd(), 'src/main.js')
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js',
        //对分离出来的包(名字)进行hash编码
        chunkFilename: '[name].[hash].js',
        publicPath:"/"
    },
    plugins: [
        //实现css的抽离
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader']
            }, {
                test: /\.css$/,
                // 把style-loader换成MiniCssExtractPlugin.loader
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        // publicPath: '../'
                    }
                },
                    'css-loader']
            }, {
                test: /\.(svg|eot|gif|jpg|png|ttf|woff)$/,
                use: ['file-loader']
            }
        ]
    },
    //配置后缀和路径
    resolve: {
        extensions: ['.css', '.js', '.jsx'],
        alias: {
            "@": path.resolve(process.cwd(), 'src')
        }
    },
    //使后台打印，解决定位错误(上线时也会影响所占大小)
    devtool: 'cheap-source-map',

}