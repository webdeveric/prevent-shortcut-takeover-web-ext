import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebExtPlugin from 'web-ext-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';

import webExtConfig from './web-ext-config.js';

import manifest from './src/manifest.json' assert { type: 'json' };

const dirname = fileURLToPath(new URL('.', import.meta.url));

const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'inline-source-map',
  entry: {
    'content-script': './src/content-script',
    background: './src/pages/background',
    options: './src/pages/options',
  },
  output: {
    path: resolve(dirname, 'dist'),
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
    new HtmlWebpackPlugin({
      minify: isProd,
      showErrors: true,
      chunks: ['background'],
      filename: 'background.html',
      inject: 'head',
      meta: {
        viewport: false,
      },
      title: `${manifest.name} - Background`,
    }),
    new HtmlWebpackPlugin({
      minify: isProd,
      showErrors: true,
      chunks: ['options'],
      filename: 'options.html',
      meta: {
        viewport: false,
      },
      title: `${manifest.name} - Options`,
      template: join(dirname, 'src', 'react-app-template.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(dirname, 'src', 'manifest.json'),
          to: join(dirname, 'dist', 'manifest.json'),
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

        return {
          metadata: {
            buildTimestamp: new Date().toISOString(),
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
      overwriteDest: true,
      target: [
        'firefox-desktop',
        // 'firefox-android',
        // 'chromium',
      ],
      firefoxProfile: join(dirname, '.firefox-profile'),
      chromiumProfile: join(dirname, '.chromium-profile'),
      profileCreateIfMissing: true,
      keepProfileChanges: true,
    }),
  ],
};

export default config;
