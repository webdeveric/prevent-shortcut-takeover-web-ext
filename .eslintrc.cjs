const tsconfig = require('./tsconfig.json');

const internalPathAliases = Object.keys(tsconfig.compilerOptions.paths)
  .map(path => path.replaceAll(/^@|\/\*$/g, ''))
  .join(',');

module.exports = {
  root: true,
  extends: [
    '@webdeveric/eslint-config-ts',
    'plugin:no-unsanitized/recommended-legacy',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  env: {
    webextensions: true,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/extensions': ['.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs', '.json'],
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          markers: ['!'],
          balanced: true,
        },
      },
    ],
    'import/first': 'error',
    'import/no-absolute-path': 'error',
    'import/no-cycle': 'error',
    'import/no-deprecated': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['./*.js', './*.cjs', './*.mjs', './*.ts', './*.cts', './*.mts', '**/*.test.ts'],
      },
    ],
    'import/no-relative-packages': 'error',
    'import/no-self-import': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
          caseInsensitive: true,
        },
        distinctGroup: false,
        groups: ['builtin', 'external', 'internal', 'parent', ['sibling', 'index'], 'type', 'object'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: `@{${internalPathAliases}}/**`,
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        warnOnUnassignedImports: true,
      },
    ],
    'sort-imports': 'off',
  },
  overrides: [
    {
      files: ['./*.js', './*.cjs', './*.mjs', './*.ts', './*.cts', './*.mts', './.eslintrc.cjs'],
      parserOptions: {
        project: ['./tsconfig.project-configs.json'],
      },
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['./src/**/*.tsx'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
