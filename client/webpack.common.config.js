const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: [path.join(__dirname, 'src/app.jsx')],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set true is you want JS source map
        uglifyOptions: {
          ecma: 6,
          compress: {
            drop_console: process.env.NODE_ENV === 'production',
          },
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.less', '.scss', '.sass', '.jsx', '.png', '.jpg',],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      store: path.resolve(__dirname, 'src/store'),
      actions: path.resolve(__dirname, 'src/store/actions'),
      reducers: path.resolve(__dirname, 'src/store/reducers'),
      services: path.resolve(__dirname, 'src/services'),
//      asset: path.resolve(__dirname, 'src/asset'),
//      constants: path.resolve(__dirname, 'src/constants'),
    },
  },
};
