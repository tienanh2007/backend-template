const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const ROOT = path.resolve(__dirname, './');

const webpackConfig = {
    entry: {
        post: path.join(ROOT, './src/js/post.js')
    },
    output: {
        path: path.join(ROOT, './src/public/js'),
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
    },
    plugins: [
        // Define variable
        new webpack.DefinePlugin({
            'process.env': {
                HOST_URL: JSON.stringify(process.env.HOST_URL),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.min.js'
        }
    }
};

if (isProd) {
    webpackConfig.output = {
        path: path.join(ROOT, './dist/public/js'),
        filename: '[name].js'
    }
    webpackConfig.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                HOST_URL: JSON.stringify('https://api-qd.zoostd.com'),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),

        // this is needed in webpack 2 for minify CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        // minify JS
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ];
}

module.exports = webpackConfig;
