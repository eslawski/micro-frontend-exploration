const { VueLoaderPlugin } = require("vue-loader");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('@module-federation/dashboard-plugin');
const packageJson = require("./package.json");
const webpack = require("webpack");
const env = require("../env");

const {
    container: { ModuleFederationPlugin },
} = require('webpack');
const path = require('path');

const dashboardURL = `${env.MEDUSA_BASE_URL}/env/development/get-remote?token=${env.MEDUSA_READ_TOKEN}`;

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        port: 3003,
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
                            isCustomElement: (tag) => tag.startsWith(`mfe-image-viewer-pharos-`),
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
            name: "mfeImageViewer__REMOTE_VERSION__",
            library: { type: 'var', name: 'mfeImageViewer__REMOTE_VERSION__' }, // TODO What does this do?
            filename: "remoteEntry.js",
            exposes: {
                "./mountImageViewer": "./src/exposedModules/mountImageViewer"
            },
            remotes: {
                mfeImage: DashboardPlugin.clientVersion({
                    currentHost: "mfeImageViewer",
                    remoteName: "mfeImage",
                    dashboardURL
                }),
            },
            shared: {
                ...packageJson.dependencies,
                "@ithaka/pharos/": {
                    requiredVersion: packageJson.dependencies["@ithaka/pharos"],
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            excludeChunks: ['remoteEntry'],
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        new DashboardPlugin({
            versionStrategy: `${Date.now()}`,
            filename: 'dashboard.json',
            dashboardURL: `${env.MEDUSA_BASE_URL}/update?token=${env.MEDUSA_READ_WRITE_TOKEN}`,
            versionChangeWebhook: 'https://cnn.com/', // TODO what does this do?
            metadata: {
                someMetadata: "foo",
                clientUrl: env.MEDUSA_BASE_URL,
                baseUrl: 'http://localhost:3003',
                source: {
                    url: "https://github.com/eslawski/micro-frontend-exploration/medusa-integration/mfe-image-viewer",
                },
                remote: 'http://localhost:3003/remoteEntry.js',
            },
        }),
    ],
};