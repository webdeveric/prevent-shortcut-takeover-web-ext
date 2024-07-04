import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
  verbose: true,
  sourceDir: join(dirname, 'dist'),
  artifactsDir: join(dirname, 'build'),
  build: {
    overwriteDest: true,
  },
  run: {
    startUrl: ['about:devtools-toolbox?id=%40prevent-shortcut-takeover&type=extension'],
  },
  ignoreFiles: ['pnpm-lock.yaml'],
};
