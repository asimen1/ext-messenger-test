const webpack = require('webpack');

var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var productionMode = false;

var config = {
    devtool: productionMode ? 'eval' : 'source-map',

    entry: {
        'js/background/background.min.js': './src/js/background/background.js',
        'js/content_scripts/content_script.min.js': './src/js/content_scripts/content_script.js',
        'js/popup/popup.min.js': './src/js/popup/popup.js',
        'js/devtool/devtool.min.js': './src/js/devtool/devtool.js'
    },

    output: {
        path: './dist',
        filename: '[name]' // This will use the entry key as the name.
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': productionMode ? JSON.stringify('production') : undefined
            }
        }),

        new CleanWebpackPlugin(['dist']),

        // This also watches the folder in watch mode.
        new CopyWebpackPlugin([{
            from: './src' // my todo: ignore some stuff...
        }])
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};

module.exports = config;
