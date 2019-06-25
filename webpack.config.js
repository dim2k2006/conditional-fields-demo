const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'public'),
};

const HtmlWebpackPluginConfig = {
    inject: false,
    minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true
    }
};

module.exports = {
    entry: {
        index: path.join(PATHS.source, 'pages', 'index', 'index.js'),
    },

    output: {
        path: PATHS.build,
        filename: 'js/[name].js',
        publicPath: '/'
    },

    mode: NODE_ENV === 'development' ? 'development' : 'production',

    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: path.join(PATHS.source, 'pages', 'index', 'index.pug'),
            filename: path.join(PATHS.build, 'index.html'),
            ...HtmlWebpackPluginConfig
        }),
        new HtmlWebpackPlugin({
            template: path.join(PATHS.source, 'pages', 'insurance', 'index.pug'),
            filename: path.join(PATHS.build, 'insurance.html'),
            ...HtmlWebpackPluginConfig
        }),
        new HtmlWebpackPlugin({
            template: path.join(PATHS.source, 'pages', 'alarm', 'index.pug'),
            filename: path.join(PATHS.build, 'alarm.html'),
            ...HtmlWebpackPluginConfig
        }),
        new HtmlWebpackPlugin({
            template: path.join(PATHS.source, 'pages', 'realEstate', 'index.pug'),
            filename: path.join(PATHS.build, 'real-estate.html'),
            ...HtmlWebpackPluginConfig
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                include: PATHS.source,
                loader: 'babel-loader',
                sideEffects: false
            },
            {
                test: /\.scss$/,
                include: PATHS.source,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(pug|jade)$/,
                use: [
                    'pug-loader'
                ]
            }
        ]
    },

    devServer: {
        stats: 'errors-only',
        host: '0.0.0.0',
        port: 3000,
        contentBase: PATHS.build,
        hot: true,
        historyApiFallback: true
    },
};

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new UglifyJsPlugin({
            uglifyOptions: {
                sourceMap: false,
                beautify: false,
                comments: false,
                mangle: {
                    keep_fnames: true
                },
                compress: {
                    sequences: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    warnings: false,
                    drop_console: true
                }
            }
        })
    );

    module.exports.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        })
    );

    module.exports.module.rules.push(
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }
    );
}
