const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'inline-source-map',
  entry: {
    preventShortcutTakeover: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new ESLintPlugin({
      emitWarning: true,
      extensions: ['js', 'ts'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'manifest.json'),
          to: path.join(__dirname, 'dist', 'manifest.json'),
        },
      ],
    }),
  ],
};

module.exports = config;
