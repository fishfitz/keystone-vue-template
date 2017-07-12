const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let plugins = [
    new HtmlWebpackPlugin({
        filename: '../client/template.html',
        template: path.join(__dirname, '../client/template.html'),
        inject: false
    }),
    new ExtractTextPlugin({
        filename: 'common.css'
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        'process.env.VUE_ENV': '"client"'
    }), new webpack.optimize.UglifyJsPlugin({sourceMap: false,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        },
        output: {
            comments: false
        }}),
        new webpack.optimize.AggressiveMergingPlugin());
}

module.exports = {
    watch: process.env.NODE_ENV === 'development',
    target: 'web',
    entry: path.join(__dirname, '../client/entry-client.js'),
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.join(__dirname, '../server/public')
    },
    resolve: {
        alias: {
            'request-api': './request-api-client.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader?minimize',
                    fallback: 'vue-style-loader'
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins
};
