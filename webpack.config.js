const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        post: './src/post.js'
    },
    output: {
        path: path.resolve('./public/src'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
};
