/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './library/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            animation: { slideIn: 'slideIn 1s ease-in' },
            aspectRatio: {
                '4/3': '4 / 3',
                '3/4': '3 / 4',
            },
            borderRadius: {
                0: '0',
                1: '0.0625rem',
                2: '0.125rem',
                4: '0.25rem',
                6: '0.375rem',
                8: '0.5rem',
                12: '0.75rem',
                16: '1rem',
                18: '1.125rem',
                20: '1.25rem',
                24: '1.5rem',
                32: '2rem',
                36: '2.25rem',
                40: '2.5rem',
                44: '2.75rem',
                48: '3rem',
                56: '3.5rem',
                60: '3.75rem',
            },
            boxShadow: {
                focus: '0 0 0 4px var(--tw-shadow-color)',
            },
            colors: {
                white: {
                    50: '#FFFFFF',
                    100: '#FDFDFD',
                    200: '#FAFAFA',
                    300: '#F8F8F8',
                    400: '#F5F5F5',
                    500: '#F3F3F3',
                    600: '#F0F0F0',
                    700: '#EEEEEE',
                    800: '#EBEBEB',
                    900: '#E9E9E9',
                    950: '#E6E6E6',
                },
                black: {
                    50: '#333333',
                    100: '#2E2E2E',
                    200: '#292929',
                    300: '#242424',
                    400: '#1F1F1F',
                    500: '#1A1A1A',
                    600: '#141414',
                    700: '#0F0F0F',
                    800: '#0A0A0A',
                    900: '#050505',
                    950: '#000000',
                },
                forest: {
                    50: '#E7FAD7',
                    100: '#D4EFBD',
                    200: '#C2E4A3',
                    300: '#AFD889',
                    400: '#9DCD6F',
                    500: '#8AC255',
                    600: '#72A344',
                    700: '#5A8333',
                    800: '#426422',
                    900: '#2B4411',
                    950: '#132500',
                },
            },
            flex: {
                2: '2 2 0%',
            },
            flexGrow: {
                2: '2',
            },
            keyframes: {
                slideIn: {
                    from: {
                        transform: 'translateY(-12px)',
                    },
                },
            },
            screens: {
                '3xl': '1600px',
                '4xl': '1900px',
            },
        },
        spacing: {
            '0': '0',
            '1': '0.0625rem',
            '2': '0.125rem',
            '4': '0.25rem',
            '6': '0.375rem',
            '8': '0.5rem',
            '12': '0.75rem',
            '16': '1rem',
            '18': '1.125rem',
            '20': '1.25rem',
            '24': '1.5rem',
            '32': '2rem',
            '36': '2.25rem',
            '40': '2.5rem',
            '44': '2.75rem',
            '48': '3rem',
            '56': '3.5rem',
            '60': '3.75rem',
            '64': '4rem',
            '72': '4.5rem',
            '80': '5rem',
            '88': '5.5rem',
            '96': '6rem',
            '104': '6.5rem',
            '112': '7rem',
            '120': '7.5rem',
            '128': '8rem',
            '144': '9rem',
            '176': '11rem',
            '208': '13rem',
            '304': '19rem',
            '320': '20rem',
            '544': '34rem',
            '800': '50rem',
            '896': '56rem',
            '960': '60rem',
            '1120': '70rem',
            '1280': '80rem',

            '1/20': '5%',
            '1/10': '10%',
            '2/25': '12.5%',
            '1/5': '20%',
            '1/4': '25%',
            '3/10': '30%',
            '2/5': '40%',
            '1/2': '50%',
            '3/5': '60%',
            '7/10': '70%',
            '3/4': '75%',
            '4/5': '80%',
            '9/10': '90%',
        },
        fontSize: {
            45: '2.8rem',
            35: '2.2rem',
            32: '2rem',
            25: '1.5rem',
            20: '1.25rem',
            18: '1.13rem',
            16: '1rem',
            14: '0.875rem',
            13: '0.8rem',
            12: '0.75rem',
            10: '0.625rem',
            8: '0.5rem',
        },
    },
    plugins: [
        require('tailwind-scrollbar')({
            preferredStrategy: 'pseudoelements',
            nocompatible: true,
        }),
    ],
};
