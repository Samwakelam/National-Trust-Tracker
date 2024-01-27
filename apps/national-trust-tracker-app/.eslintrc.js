/** @type {import("eslint").Linter.Config} */

module.exports = {
    root: true,
    extends: [
        '@repo/eslint-config/next.js',
        'next/babel',
        'next/core-web-vitals',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
    },
    rules: {
        'no-extend-native': false,
    },
};
