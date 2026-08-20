import js from '@eslint/js'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'

export default defineConfig([
    globalIgnores(['dist', 'node_modules', 'coverage']),

    js.configs.recommended,

    {
        files: ['**/*.js'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
    },

    prettier,
])
