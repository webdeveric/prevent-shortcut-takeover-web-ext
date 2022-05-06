/* eslint-disable @typescript-eslint/naming-convention */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const WebExtPlugin = require('web-ext-plugin');
const git = require('git-rev-sync');
/* eslint-enable @typescript-eslint/naming-convention */

const webExtConfig = require('./web-ext-config.js');

const { name: extensionName } = require('./src/manifest.json');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'inline-source-map',
  entry: {
    preventShortcutTakeover: './src/preventShortcutTakeover',
    background: './src/pages/background',
    options: './src/pages/options',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: true,
              modules: {
                namedExport: true,
                localIdentName: '[name]__[local]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
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
    new MiniCssExtractPlugin(),
    new ESLintPlugin({
      emitWarning: true,
      extensions: ['js', 'ts'],
    }),
    new HtmlWebpackPlugin({
      minify: isProd,
      showErrors: true,
      chunks: ['background'],
      filename: 'background.html',
      inject: 'head',
      meta: {
        viewport: false,
      },
      title: `${extensionName} - Background`,
    }),
    new HtmlWebpackPlugin({
      minify: isProd,
      showErrors: true,
      chunks: ['options'],
      filename: 'options.html',
      meta: {
        viewport: false,
      },
      title: `${extensionName} - Options`,
      template: path.join(__dirname, 'src', 'react-app-template.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'manifest.json'),
          to: path.join(__dirname, 'dist', 'manifest.json'),
        },
      ],
    }),
    new WebpackAssetsManifest({
      output: `build-manifest.json`,
      integrity: true,
      entrypoints: true,
      sortManifest: false,
      integrityHashes: ['sha256', 'sha512'],
      transform(assets) {
        const { entrypoints, ...assetsOnly } = assets;

        let gitDetails = {};

        try {
          gitDetails = {
            branch: git.branch(),
            timestamp: git.date(),
            sha: git.short(),
          };
          // eslint-disable-next-line no-empty
        } catch (_err) {}

        return {
          metadata: {
            buildTimestamp: new Date().toISOString(),
            git: gitDetails,
          },
          assets: assetsOnly,
          entrypoints,
        };
      },
      customize(entry, _original, manifest, asset) {
        return {
          value: {
            output: entry.value,
            size: asset.source.size(),
            integrity: asset.info[manifest.options.integrityPropertyName],
          },
        };
      },
    }),
    new WebExtPlugin({
      buildPackage: isProd,
      artifactsDir: webExtConfig.artifactsDir,
      sourceDir: webExtConfig.sourceDir,
      startUrl: webExtConfig.run.startUrl,
      target: [
        'firefox-desktop',
        // 'firefox-android',
        // 'chromium',
      ],
      firefoxProfile: path.join(__dirname, '.firefox-profile'),
      chromiumProfile: path.join(__dirname, '.chromium-profile'),
      profileCreateIfMissing: true,
      keepProfileChanges: true,
    }),
  ],
};

module.exports = config;
