const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const envFile = isProduction ? '.env.production' : '.env.development';

  return {
    entry: {
        main: [
            './src/index.ts',
            './src/styles/login.css',
        ]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@services': path.resolve(__dirname, 'src/services/'),
        '@utils': path.resolve(__dirname, 'src/utils/')
      }
    },
    output: {
      filename: '[name].[contenthash].js', // 使用内容散列确保唯一性
      chunkFilename: '[name].[contenthash].bundle.js', // 使用内容散列确保唯一性
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'templates', 'index.html'),
        inject: 'body',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'src', 'assets'), to: 'assets', globOptions: {
              ignore: []
            }
          },
          {
            from: path.resolve(__dirname, 'src', 'templates'), to: '', globOptions: {
              ignore: ['**/index.html']  // 忽略 index.html 文件
            }
          }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new Dotenv({
        path: path.resolve(__dirname, envFile), // 确保 env 文件被正确加载
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode) // 确保使用 Webpack 的 mode 设置环境变量
      }),
    ],
    devServer: {
      static: {
        "directory": path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      hot: true,
      historyApiFallback: true, // 确保 SPA 可以正常工作
    },
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all',
        name: false,
      }
    }
  };
};
