const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('@module-federation/dashboard-plugin');
const packageJson = require("./package.json");
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
            library: { type: 'var', name: 'home' }, // TODO What does this do?
            remotes: {
                mfeNavigation: DashboardPlugin.clientVersion({
                    currentHost: "home",
                    remoteName: "mfeNavigation",
                    dashboardURL
                }),
                mfeImageViewer: DashboardPlugin.clientVersion({
                    currentHost: "home",
                    remoteName: "mfeImageViewer",
                    dashboardURL
                }),
                mfeImageRecommender: DashboardPlugin.clientVersion({
                    currentHost: "home",
                    remoteName: "mfeImageRecommender",
                    dashboardURL
                })
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
        new DashboardPlugin({
            versionStrategy: `${Date.now()}`,
            filename: 'dashboard.json',
            dashboardURL: `${env.MEDUSA_BASE_URL}/update?token=${env.MEDUSA_READ_WRITE_TOKEN}`,
            versionChangeWebhook: 'https://cnn.com/', // TODO what is this?
            metadata: {
                someMetadata: "foo",
                clientUrl: env.MEDUSA_BASE_URL,
                baseUrl: "http://localhost:3001",
                source: {
                    url: "https://github.com/eslawski/micro-frontend-exploration/medusa-integration/home",
                },
                remote: "http://localhost:3001/remoteEntry.js",
            },
        }),
    ],
};