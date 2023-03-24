const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/**
 * Variables de entorno
 */
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry : './src/index.js', //Punto de entrada para nuestra aplicacion, por defecto src/index.js
    output : {
        path : path.resolve(__dirname, 'dist'),//el nombre se puede modiicar pero por defecto y lo que se recomienda es dist
        //filename : 'main.js',//por defecto es siempre main.js
        filename : '[name].[contenthash].js',//para cambiar el nombre de archivo cuando se modifica
    },
    mode : 'development',
    //watch : true, //Se activa para el modo observador en el compilado.
    resolve : {//se establece las extenciones que se usan dentro nuestro proyecto
        extensions : ['.js'],
        alias : {
            '@utils' : path.resolve(__dirname, 'src/utils/'),
            '@templates' : path.resolve(__dirname, 'src/templates/'),
            '@styles' : path.resolve(__dirname, 'src/styles/'),
            '@images' : path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },{//regla para css
                test: /\.css|.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },{//reglas para imagenes
                test : /\.png/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: "./assets/images/",
                },
            },{//regla para css
                test : /\.(woff|woff2)/,
                loader : 'url-loader',
                options : {
                    limit : 10000,
                    mimetype : "application/font-woff",
                    name : "[name].[contenthash].[ext]",
                    outputPath : "./assets/fonts/",
                    publicPath : "../assets/fonts/",
                    esModule : false,
                },
                type: 'javascript/auto', //evita la duplicacion de los fonts
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: 'index.html',
        }),//plugin para HTML
        new MiniCssExtractPlugin({
            filename : "assets/[name].[contenthash].css"
        }),//plugin para CSS 
        new Dotenv(),//para las variables de entorno
    ],
}