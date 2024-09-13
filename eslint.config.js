import js from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSecurity from 'eslint-plugin-security';
import eslintIgnores from './eslint.ignores.js';

export default [
  eslintPluginSecurity.configs.recommended,
  eslintPluginPrettierRecommended,
  js.configs.recommended,
  {
    files: ['**/*.js'],
    ignores: eslintIgnores,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'prettier/prettier': 'error',
      'block-spacing': 'error',
      complexity: ['error', { max: 7 }],
      // 'import/order': ['error', { groups: ['builtin', 'external', 'parent', 'sibling', 'index'] }],
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'no-unused-vars': 'warn'
    }
  }
];
