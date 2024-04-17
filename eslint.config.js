import js from '@eslint/js'
import ts from 'typescript-eslint'
import configPrettier from 'eslint-config-prettier'
// import vitest from 'eslint-plugin-vitest'
import globals from 'globals'

export default ts.config(
  {
    name: 'Global ESLint recommended',
    ...js.configs.recommended,
  },
  {
    name: 'Global ignores',
    ignores: ['dist'],
  },
  {
    name: 'JavaScript files',
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    name: 'TypeScript files',
    extends: ts.configs.recommended,
    files: ['src/**/*.ts', 'vite.config.ts', 'vitest.config.ts'],
  },
  // TODO: add eslint plugin for vitest tests
  // {
  //   name: 'Vitest test files',
  //   extends: ts.configs.recommended,
  //   plugins: { vitest },
  //   files: ['src/**/*.test.ts'],
  //   rules: {
  //     ...vitest.configs.recommended.rules,
  //     'vitest/no-test-prefixes': 'error',
  //     'vitest/prefer-todo': 'error',
  //   },
  // },
  {
    name: 'ESLint config Prettier',
    ...configPrettier,
  },
  {
    name: 'Global rules',
    rules: {
      eqeqeq: 'error',
      'no-console': 'warn',
    },
  }
)
