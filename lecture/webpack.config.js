const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스 production
    devtool: 'eval', // 실서비스 hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env',{
                    targets: {
                        browsers: ['> 5% in KR', 'last 2 chrome versions'],
                    },
                    debug: true,
                }], '@babel/preset-react'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel' // hot reloading
                ]
            },
        }],
    },

    plugins: [
        new RefreshWebpackPlugin() //webpack-cli 4.x 버전 이후
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    }, // 출력

    devServer: {
        publicPath: '/dist/', // webpack-dev-server에서 필요한 가상 경로
        hot: true,
    },
};