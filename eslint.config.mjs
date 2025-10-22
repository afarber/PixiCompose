import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const config = [
    {
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
            },
        },
        rules: {
            indent: ['error', 4],
            quotes: ['warn', 'single'],
            semi: ['error', 'always'],
            'no-console': ['warn'],
            'prefer-const': 'error',
            'no-var': 'error',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'object-shorthand': 'error',
            'prefer-template': 'error',
            'prefer-arrow-callback': 'error',
        },
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2024,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            indent: ['error', 4],
            quotes: ['warn', 'single'],
            semi: ['error', 'always'],
            'no-console': ['warn'],
            'prefer-const': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
        },
    },
    {
        ignores: ['node_modules/', 'build/', 'dist/', 'coverage/'],
    },
];

export default config;
