import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        '../../packages/tailwind-library/**/*.{js,ts,jsx,tsx,mdx}',
        './library/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
