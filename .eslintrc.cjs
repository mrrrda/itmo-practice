module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'import', 'prettier'],

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-shadow': 'off',

    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

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

    'max-len': ['error', { code: 120 }],
    'prettier/prettier': ['error'],
  },
};
