const path = require('path');
const webpack = require('webpack');
const HMR = webpack.HotModuleReplacementPlugin;
//对webpack相同的代码进行合并
const base = require('./webpack.base.js');
const merge = require('webpack-merge')
module.exports = merge(base, {
    devServer: {
        port: 8888,
        hot: true,
        open: true,
        quiet: true
    },
    //可以减少build.js打包的大小，单独用script引入即可,需要再下载moment
    externals: {
        "antd": "antd",
        "moment": "moment",
        "react": "React",
        "react-dom": "ReactDOM"
    }
})