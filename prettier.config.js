import prettierConfig from '@webdeveric/prettier-config';

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  ...prettierConfig,
  plugins: ['prettier-plugin-tailwindcss'],
};
