import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import config from './webpack.config';

const postCssLoader: webpack.Loader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: `${__dirname}/postcss.config.js`
    }
  }
};

const webpackConfig = merge(config, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__what&timeout=2000&overlay=false',
      '../src/index.tsx'
    ]
  },
  output: {
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', postCssLoader]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            }
          },
          postCssLoader,
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DIY': 'dev'
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: 'index.html',
      template: '../src/tpl/index.ejs',
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
});

export default webpackConfig;
