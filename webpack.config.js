const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const envFile = isProduction ? '.env.production' : '.env.development';

  return {
    entry: {
      index: './src/index.ts',
      login: './src/login.ts'
    },
    output: {
      filename: '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@services': path.resolve(__dirname, 'src/services/'),
        '@utils': path.resolve(__dirname, 'src/utils/')
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext][query]',
          },
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'templates', 'index.html'),
        filename: 'index.html',
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'templates', 'login.html'),
        filename: 'login.html',
        chunks: ['login']
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'assets'),
            to: 'assets',
            globOptions: {
              ignore: []
            }
          },
        ]
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
      port: 5000,
      hot: true,
      open: false,
      historyApiFallback: true, // 确保 SPA 可以正常工作，返回 index.html
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
