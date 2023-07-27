const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require("./package.json");

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
        port: 3001,
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
            name: "home",
            remotes: {
                mfeNavigation: "mfeNavigation@http://localhost:3002/remoteEntry.js",
                mfeImageViewer: "mfeImageViewer@http://localhost:3003/remoteEntry.js",
                mfeImageRecommender: "mfeImageRecommender@http://localhost:3005/remoteEntry.js"
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
};