import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-default-export': 'off', // 允许默认导出
      'import/no-named-as-default': 'warn', // 警告命名导入与默认导入混用
      // 强制使用命名导入（针对特定库）
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@mui/icons-material/*'],
              message:
                '请使用命名导入: import { Icon } from "@mui/icons-material"',
            },
            {
              group: ['@mui/joy/*'],
              message: '请使用命名导入: import { Component } from "@mui/joy"',
            },
          ],
        },
      ],
    },
  }
)
