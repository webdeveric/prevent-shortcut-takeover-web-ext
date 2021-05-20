'use strict';

const path = require('path');

module.exports = {
  verbose: true,
  sourceDir: path.join(__dirname, 'src'),
  artifactsDir: path.join(__dirname, 'build'),
  build: {
    overwriteDest: true,
  },
  ignoreFiles: [ 'package-lock.json' ],
};
