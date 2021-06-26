import * as path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as ProgressBarPlugin from 'progress-bar-webpack-plugin';

const webpackConfig = {
  entry: {
    index: '../src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, '../dist/statics/'),
    publicPath: './statics/',
    filename: '[name].js?cv=h0[hash]',
    chunkFilename: 'dj.[name].js?cv=h0[hash]'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'babel-preset-react',
              'babel-preset-es2015',
              'babel-preset-stage-0'
            ],
            cacheDirectory: true,
            plugins: ['transform-async-to-generator', 'transform-runtime']
          }
        }
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), new ProgressBarPlugin()],
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    },
    extensions: ['.scss', '.ts', '.tsx', '.json', '.jsx', '.js', '.css']
  }
};

export default webpackConfig;
