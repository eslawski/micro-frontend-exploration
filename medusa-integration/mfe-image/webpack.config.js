const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('@module-federation/dashboard-plugin');
const packageJson = require("./package.json");
const env = require("../env");

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
        port: 3004,
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
            name: "mfeImage__REMOTE_VERSION__",
            library: { type: 'var', name: 'mfeImage__REMOTE_VERSION__' }, // TODO What does this do?
            filename: "remoteEntry.js",
            exposes: {
                "./mountImage": "./src/exposedModules/mountImage"
            },
            shared: {
                ...packageJson.dependencies,
                "react": { singleton: true },
                "react-dom": { singleton: true },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            excludeChunks: ['remoteEntry'],
        }),
        new DashboardPlugin({
            versionStrategy: `${Date.now()}`, // You can change this to be a string for testing purposes
            filename: 'dashboard.json',
            dashboardURL: `${env.MEDUSA_BASE_URL}/update?token=${env.MEDUSA_READ_WRITE_TOKEN}`,
            versionChangeWebhook: 'https://cnn.com/', // TODO What is this?
            metadata: {
                someMetadata: "foo",
                clientUrl: env.MEDUSA_BASE_URL,
                baseUrl: 'http://localhost:3004',
                source: {
                    url: "https://github.com/eslawski/micro-frontend-exploration/medusa-integration/mfe-image",
                },
                remote: 'http://localhost:3004/remoteEntry.js',
            },
        }),
    ],
};