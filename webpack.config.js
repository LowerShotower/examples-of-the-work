const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');   
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const config  = {
    mode: isProd ? 'development' : 'production',

    devtool: isProd ? false : 'source-map',
    devServer: {
             contentBase: './dist',
            //  hot: true,
           },
    entry: {
        app: './src/app.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        library: 'game'
    },

    module: {
        rules: [
            { test: /\.hbs|\.handlebars$/, loader: "handlebars-loader" },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.sass|\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
              },
              {
                test: /\.(png|jpeg|jpg)$/,
                use: [
                    {loader: 'file-loader',
                    options: {
                    name: '[name].[ext]',
                    outputPath: 'img/',
                    publicPath: 'img/'}
                }
                ]
                
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(webm|mp4)$/,
                loader: 'file-loader',
                options: {
                    name: 'videos/[name].[hash:7].[ext]'
                }
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
           title: 'Game',
            template: path.resolve(__dirname, 'src', 'html', 'index.hbs'),
        }),
        new ExtractTextPlugin({
            filename: 'style/style.css',
            //  disable: !isProd,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          }),
   ],

}

module.exports = config