module.exports = api => {
  const isDev = api.env('development');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          debug: isDev,
          spec: true,
          useBuiltIns: 'usage',
          targets: {
            node: 'current',
          },
          corejs: 3,
        },
      ],
      '@babel/preset-typescript',
    ],
  };
};
