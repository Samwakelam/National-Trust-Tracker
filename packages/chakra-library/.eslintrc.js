module.exports = {
    root: true,
    extends: ['eslint:recommended'],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'index.d.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['react-refresh'],
    rules: {
        'no-empty-pattern': 'off',
        'import/no-anonymous-default-export': 'off',
        'no-duplicate-imports': 'warn',
        'react/jsx-pascal-case': 'off',
    },
};
