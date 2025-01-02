const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Matches .css files
                use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Specify your HTML template
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        historyApiFallback: true,
        port: 3000,
        open: true,
    },
};
