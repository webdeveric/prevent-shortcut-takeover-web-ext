const path = require('path');

module.exports = {
  verbose: true,
  sourceDir: path.join(__dirname, 'dist'),
  artifactsDir: path.join(__dirname, 'build'),
  build: {
    overwriteDest: true,
  },
  run: {
    startUrl: ['about:devtools-toolbox?id=%40prevent-shortcut-takeover&type=extension'],
  },
  ignoreFiles: ['package-lock.json', 'pnpm-lock.yaml'],
};
