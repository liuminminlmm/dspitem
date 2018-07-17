const path = require('path');
const webpack = require('webpack');
const HMR = webpack.HotModuleReplacementPlugin;
//对webpack相同的代码进行合并
const base=require('./webpack.base.js');
const merge = require('webpack-merge');
module.exports = merge(base,{
    //开发模式  配置成上线模式production后可以自动压缩
    mode: 'development',
    plugins: [
        //css热刷新
        new HMR()
    ],
    devServer: {
        port: 8888,
        hot: true,
        open: true,
        quiet: true,
        //默认路由是BrowserRouter
        historyApiFallback:true
    },  devtool: 'cheap-source-map',
})