/* eslint-env node */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
    mode: 'development',

    // NOTE: This is important to create a CSP compliant output that doesn't use eval and
    // NOTE: therefore doesn't require "unsafe-eval" policy declaration in the manifest.json.
    devtool: 'source-map',

    entry: {
        'background/service_worker.min.js': './src/background/service_worker.js',
        'content_scripts/content_script.min.js': './src/content_scripts/content_script.js',
        'popup/popup.min.js': './src/popup/popup.js',
        'devtool/devtool.min.js': './src/devtool/devtool.js',
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]', // This will use the entry key as the name.
    },

    plugins: [
        new CleanWebpackPlugin(),

        // This also watches the folder in watch mode.
        new CopyWebpackPlugin({
            patterns: [
                path.join(__dirname, 'src', 'manifest.json'),
                {
                    from: path.join(__dirname, 'src', 'icons'),
                    to: path.join(__dirname, 'dist', 'icons'),
                },
                {
                    from: path.join(__dirname, 'src', 'devtool', 'html'),
                    to: path.join(__dirname, 'dist', 'devtool', 'html'),
                },
                {
                    from: path.join(__dirname, 'src', 'devtool', 'devtoolLoader.js'),
                    to: path.join(__dirname, 'dist', 'devtool'),
                },
                {
                    from: path.join(__dirname, 'src', 'popup', 'html'),
                    to: path.join(__dirname, 'dist', 'popup', 'html'),
                },
            ],
        }),
    ],
};

module.exports = config;
