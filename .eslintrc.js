module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'import', 'prettier'],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-shadow': 'off',

    'max-len': ['error', { code: 120 }],
    'prettier/prettier': ['error'],

    'no-console': ['warn', { allow: ['error', 'info'] }],

    'import/no-cycle': 'error',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['internal'],
      },
    ],
  },
};
