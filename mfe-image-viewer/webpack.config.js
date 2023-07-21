const { VueLoaderPlugin } = require("vue-loader");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('@module-federation/dashboard-plugin');
const deps = require("./package.json");

// const { readFileSync } = require('fs');
// const tokens = readFileSync(__dirname + '/../.env')
//     .toString('utf-8')
//     .split('\n')
//     .map(v => v.trim().split('='));
// process.env.DASHBOARD_READ_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_READ_TOKEN')[1];
// process.env.DASHBOARD_WRITE_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_WRITE_TOKEN')[1];
// process.env.DASHBOARD_BASE_URL = tokens.find(([k]) => k === 'DASHBOARD_BASE_URL')[1];

const {
    container: { ModuleFederationPlugin },
} = require('webpack');
const path = require('path');

// const dashboardURL = `${process.env.DASHBOARD_BASE_URL}/env/development/get-remote?token=${process.env.DASHBOARD_READ_TOKEN}`;

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
            name: "mfeImageViewer",
            filename: "remoteEntry.js",
            exposes: {
                "./mountImageViewer": "./src/exposedModules/mountImageViewer"
            }
        }),
        // new ModuleFederationPlugin({
        //     name: 'home',
        //     filename: 'remoteEntry.js',
        //     library: { type: 'var', name: 'home' },
        //     remotes: {
        //         dsl: DashboardPlugin.clientVersion({
        //             currentHost: 'home',
        //             remoteName: 'dsl',
        //             dashboardURL,
        //         }),
        //         search: DashboardPlugin.clientVersion({
        //             currentHost: 'home',
        //             remoteName: 'search',
        //             dashboardURL,
        //         }),
        //         nav: DashboardPlugin.clientVersion({
        //             currentHost: 'home',
        //             remoteName: 'nav',
        //             dashboardURL,
        //         }),
        //         utils: DashboardPlugin.clientVersion({
        //             currentHost: 'home',
        //             remoteName: 'utils',
        //             dashboardURL,
        //         }),
        //     },
        //     // sharing code based on the installed version, to allow for multiple vendors with different versions
        //     shared: {
        //         ...deps,
        //         "react": { singleton: true },
        //         "react-dom": { singleton: true }
        //     },
        // }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            excludeChunks: ['remoteEntry'],
        }),
        // new DashboardPlugin({
        //     versionStrategy: `${Date.now()}`,
        //     filename: 'dashboard.json',
        //     dashboardURL: `${process.env.DASHBOARD_BASE_URL}/update?token=${process.env.DASHBOARD_WRITE_TOKEN}`,
        //     versionChangeWebhook: 'http://cnn.com/',
        //     metadata: {
        //         clientUrl: process.env.DASHBOARD_BASE_URL,
        //         baseUrl: 'http://localhost:3001',
        //         source: {
        //             url: 'https://github.com/module-federation/federation-dashboard/tree/master/dashboard-example/home',
        //         },
        //         remote: 'http://localhost:3001/remoteEntry.js',
        //     },
        // }),
    ],
};