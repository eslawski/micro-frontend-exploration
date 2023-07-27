const { VueLoaderPlugin } = require("vue-loader");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const {
    container: { ModuleFederationPlugin },
} = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        port: 3005,
    },
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        publicPath: `auto`,
    },
    cache: false,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        compilerOptions: {
                            hotReload: false,
                            isCustomElement: (tag) => tag.startsWith(`mfe-image-recommender-pharos-`),
                        },
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.jsx?$/,
                loader: require.resolve('esbuild-loader'),
                exclude: /node_modules/,
                options: {
                    loader: 'jsx',
                    target: 'es2015',
                },
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: "mfeImageRecommender",
            filename: "remoteEntry.js",
            exposes: {
                "./mountImageRecommender": "./src/exposedModules/mountImageRecommender"
            },
            remotes: {
                mfeImage: "mfeImage@http://localhost:3004/remoteEntry.js"
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            excludeChunks: ['remoteEntry'],
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
};