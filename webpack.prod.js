const path = require('path');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: './src/client/index.js',
        toDo: './src/client/js/toDo.js',
    },
    mode: 'production',
    devtool: 'source-map',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ]
    },
    plugins: [

        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),

        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            inject: true,
            chunks: ['index'],
            filename: "./index.html",
        }),

        new HtmlWebPackPlugin({
            template: './src/client/views/todoPage.html',
            inject: true,
            chunks: ['index'],
            filename: 'todoPage.html'
        }),




    ]


}