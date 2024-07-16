const path = require('path');
const webpack = require('webpack');
// 提取并压缩css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
// 压缩js
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob-all');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const envFile = isProduction ? '.env.production' : '.env.development';

  return {
    entry: glob.sync('./src/views/*.ts').reduce((entries, file) => {
      entries[path.basename(file, '.ts')] = file;
      return entries;
    }, {
      app: './src/app.ts',
    }),
    output: {
      filename: '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@views': path.resolve(__dirname, 'src/views/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
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
          use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader']
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
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new PurgeCSSPlugin({
        paths: glob.sync([
          path.join(__dirname, 'src', '**', '*.{ts,tsx,js,jsx,html}'),
        ]),
      }),
      new Dotenv({
        path: path.resolve(__dirname, envFile), // 确保 env 文件被正确加载
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode) // 确保使用 Webpack 的 mode 设置环境变量
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        filename: 'index.html',
        chunks: ['app'],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: false,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }
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
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
  };
};
