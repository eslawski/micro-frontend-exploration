const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");

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
        port: 3002,
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
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
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
        new ModuleFederationPlugin({
            name: "mfeNavigation",
            filename: "remoteEntry.js",
            exposes: {
                "./mountHeader": "./src/exposedModules/mountHeader",
                "./mountFooter": "./src/exposedModules/mountFooter",
            },
            shared: {
                ...packageJson.dependencies,
                "react": { singleton: true },
                "react-dom": { singleton: true },
                "@ithaka/pharos/": {
                    requiredVersion: packageJson.dependencies["@ithaka/pharos"],
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            excludeChunks: ['remoteEntry'],
        }),
    ],
    optimization: {
        chunkIds: "named",
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: /^Pharos/,
                    keep_fnames: /^Pharos/,
                },
            }),
        ],
    },
};