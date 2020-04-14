import path from 'path';
import WebpackBar from 'webpackbar';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { Options as HtmlMinifierOptions } from 'html-minifier';
import { Configuration } from 'webpack';
import { loader as MiniCssExtractLoader } from 'mini-css-extract-plugin';
import { PROJECT_NAME, PROJECT_ROOT, __DEV__, HMR_PATH } from '../utils/constants';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// index.html 压缩选项
const htmlMinifyOptions: HtmlMinifierOptions = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  useShortDoctype: true,
};

function getCssLoaders(importLoaders: number) {
  return [
    __DEV__ ? 'style-loader' : MiniCssExtractLoader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: true,
        importLoaders,
      },
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: true },
    },
  ];
}

const commonConfig: Configuration = {
  cache: true,
  context: PROJECT_ROOT,
  entry: ['react-hot-loader/patch', path.resolve(PROJECT_ROOT, './src/index.tsx')],
  output: {
    publicPath: '/',
    path: path.resolve(PROJECT_ROOT, './dist'),
    filename: 'js/[name]-[hash].bundle.js',
    hashSalt: PROJECT_NAME || 'default-name',
  },
  resolve: {
    extensions: ['.js', '.tsx', 'ts', '.json'],
    alias: {
      // 替换 react-dom 成 @hot-loader/react-dom 以支持 react hooks 的 hot reload
      'react-dom': '@hot-loader/react-dom',
      '@': path.resolve(PROJECT_ROOT, './src'),
    },
  },
  plugins: [
    new WebpackBar({
      name: 'WebIM',
      // react blue
      color: '#61dafb',
    }),
    new FriendlyErrorsPlugin(),
    new WebpackBuildNotifierPlugin({ suppressSuccess: true }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: __DEV__ ? false : htmlMinifyOptions,
      template: path.resolve(PROJECT_ROOT, './public/index.html'),
      templateParameters: (...args: any[]) => {
        const [compilation, assets, assetTags, options] = args;
        const rawPublicPath = commonConfig.output!.publicPath!;
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options,
          },
          PUBLIC_PATH: rawPublicPath.endsWith('/') ? rawPublicPath.slice(0, -1) : rawPublicPath,
        };
      },
    }),
    new CopyPlugin(
      [
        {
          // 所有一级文件
          from: '*',
          to: path.resolve(PROJECT_ROOT, './dist'),
          // 目标类型是文件夹
          toType: 'dir',
          // index.html 会通过 html-webpack-plugin 自动生成，所以需要被忽略掉
          ignore: ['index.html'],
        },
      ],
      { context: path.resolve(PROJECT_ROOT, './public') },
    ),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        // 开启缓存
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: getCssLoaders(0),
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              // 图片低于 10k 会被转换成 base64 格式的 dataUrl
              limit: 10 * 1024,
              // [hash] 占位符和 [contenthash] 是相同的含义
              // 都是表示文件内容的 hash 值，默认是使用 md5 hash 算法
              name: '[name].[contenthash].[ext]',
              // 保存到 images 文件夹下面
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[contenthash].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
};

if (__DEV__) {
  // 开发环境下注入热更新补丁
  // reload=true 设置 webpack 无法热更新时刷新整个页面，overlay=true 设置编译出错时在网页中显示出错信息遮罩
  (commonConfig.entry as string[]).unshift(
    `webpack-hot-middleware/client?path=${HMR_PATH}&reload=true&overlay=true`,
  );
}

export default commonConfig;
