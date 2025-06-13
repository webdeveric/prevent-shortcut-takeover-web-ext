import { join, resolve } from 'node:path';

import { comment } from '@webdeveric/utils/comment';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebExtPlugin from 'web-ext-plugin';
// eslint-disable-next-line import/no-named-as-default
import webpack from 'webpack';
import { WebpackAssetsManifest } from 'webpack-assets-manifest';

import manifest from './src/manifest.json' with { type: 'json' };
import tsconfig from './tsconfig.json' with { type: 'json' };
import webExtConfig from './web-ext-config.mjs';

const dirname = import.meta.dirname;
const runnerDebug = process.env.RUNNER_DEBUG === '1';
const buildTimestamp = new Date().toISOString();
const isProd = process.env.NODE_ENV === 'production';

const alias = Object.fromEntries(
  Object.entries(tsconfig.compilerOptions.paths).reduce((entries, [key, value]) => {
    entries.push([key.slice(0, -2), resolve(dirname, value.at(0).slice(0, -2))]);

    return entries;
  }, []),
);

const config = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'inline-source-map',
  entry: {
    'content-script': './src/content-script',
    background: './src/pages/background',
    options: './src/pages/options',
  },
  experiments: {
    outputModule: true,
  },
  output: {
    path: resolve(dirname, 'dist'),
    filename: '[name].js',
  },
  stats: {
    errorDetails: runnerDebug,
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  module: {
    parser: {
      javascript: {
        importMeta: false,
      },
    },
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
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
    alias,
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js'],
      '.jsx': ['.ts', '.tsx', '.js'],
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: true,
      banner: comment(
        `
          ${manifest.name} (${manifest.version})

          Source code and build instructions are available at ${manifest.homepage_url}

          Build timestamp: ${buildTimestamp}
        `,
        {
          type: 'legal',
        },
      ),
    }),
    new webpack.EnvironmentPlugin({
      GITHUB_SHA: '',
      GITHUB_REF: '',
      GITHUB_HEAD_REF: '',
      GITHUB_BASE_REF: '',
      BUILD_TIMESTAMP: buildTimestamp,
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      minify: isProd,
      showErrors: true,
      scriptLoading: 'module',
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
      scriptLoading: 'module',
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
            buildTimestamp,
          },
          assets: assetsOnly,
          entrypoints,
        };
      },
      customize(entry, _original, assetsManifest, asset) {
        return {
          value: {
            output: entry.value,
            size: asset.source.size(),
            integrity: asset.info[assetsManifest.options.integrityPropertyName],
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
