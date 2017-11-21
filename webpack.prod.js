const path = require('path');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname);
const autoprefixer = require('autoprefixer');
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index:['babel-polyfill',APP_PATH+'/router/router.js'],
        phone:['babel-polyfill',APP_PATH+'/router/routerPhone.js'],
        vendors: ['react','reflux','react-mixin','react-router','lodash','whatwg-fetch']
    },
    output: {
        path: BUILD_PATH,
        publicPath: "./",
        filename: '[name].min.js'
    },
    devtool: false, //"eval-source-map",
    module: {
        loaders: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loaders:['babel']
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style','css!postcss')},
            { test: /\.less$/, loader: ExtractTextPlugin.extract('style','css!less!postcss')},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=1000&name=images/[name].[ext]' }

        ],
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        })
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', 'less']
    },
    plugins: [
        // new CleanPlugin('build'),
        new webpack.optimize.CommonsChunkPlugin({
            names: "vendors",
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
            //sourceMap: true,
            except: ['$', 'exports', 'require'] //排除关键字
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            chunks: ['vendors','index'],
            inject:true,
            //favicon: './bitbug_favicon.ico'
           // excludeChunks:['vendors','index'] 不引入
        }),
        new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, 'static'),
            to: 'static',
            ignore: ['.*']
          }
        ]),
        // 模块热替换插件
        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name].css')
    ]
};
