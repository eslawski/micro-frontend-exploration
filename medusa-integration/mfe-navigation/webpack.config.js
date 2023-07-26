const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('@module-federation/dashboard-plugin');
const packageJson = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");
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
            name: "mfeNavigation__REMOTE_VERSION__",
            library: { type: 'var', name: 'mfeNavigation__REMOTE_VERSION__' }, // TODO What does this do?
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
        new DashboardPlugin({
            versionStrategy: `${Date.now()}`,
            filename: 'dashboard.json',
            dashboardURL: `${env.MEDUSA_BASE_URL}/update?token=${env.MEDUSA_READ_WRITE_TOKEN}`,
            versionChangeWebhook: 'https://cnn.com/', // TODO what does this do?
            metadata: {
                someMetadata: "foo",
                clientUrl: env.MEDUSA_BASE_URL,
                baseUrl: 'http://localhost:3002',
                source: {
                    url: "https://github.com/eslawski/micro-frontend-exploration/medusa-integration/mfe-navigation",
                },
                remote: 'http://localhost:3002/remoteEntry.js',
            },
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