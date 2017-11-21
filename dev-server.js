var path = require('path');
var express = require("express");
var webpack = require("webpack");
var config = require("./webpack.dev.js");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require('webpack-hot-middleware');
var proxy = require('http-proxy-middleware');

var app = express();

var compiler = webpack(config);

// 为了修改html文件也能实现热加载，使用webpack插件来监听html源文件改变事件
//compiler.plugin('compilation',function(compilation){
//    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//        // 发布事件
//        hotMiddleware.publish({ action: 'reload' });
//        cb();
//    })
//})

app.use(webpackDevMiddleware(compiler,{
    publicPatch:"./",
    quiet:true
}));

app.use(webpackHotMiddleware(compiler));

var staticPath = path.posix.join('/static')
app.use(staticPath, express.static('./static'))

const apiProxy = proxy('/**/**',{ target: 'https://api.sjyprt.com',changeOrigin: true });//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use(apiProxy);

app.listen(8080,function(){
    console.log('Listening at http://localhost:8080');
});