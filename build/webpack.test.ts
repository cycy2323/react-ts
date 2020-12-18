import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as TerserPlugin from 'terser-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import config from './webpack.config';

const postCssLoader: webpack.Loader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: `${__dirname}/postcss.config.js`
    }
  }
};

const htmlMinifyOptions = {
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true
};

const webpackConfig = merge(config, {
  mode: 'production',
  stats: {
    children: false,
    entrypoints: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', postCssLoader]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
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
      'process.env.DIY': 'test'
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: '../index.html',
      template: '../src/tpl/index.ejs',
      inject: false,
      minify: htmlMinifyOptions
    }),
    new MiniCssExtractPlugin({
      filename: 'dc.[name].css?cv=h0[hash]'
    })
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        'base-async': {
          test: /[\\/]node_modules[\\/]/,
          name: 'base-async',
          chunks: 'async',
          priority: 80,
          reuseExistingChunk: true
        },
        base: {
          test: /[\\/]node_modules[\\/]/,
          name: 'base',
          chunks: 'all',
          priority: 70,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [new OptimizeCSSAssetsPlugin({}), new TerserPlugin()]
  }
});

export default webpackConfig;
