import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

import {
    mediaQueries,
    whiteText,
    scrollBarStyleLight,
    scrollBarStyleDark,
} from '@sam/library';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers([
        'container',
        'logo',
        'title',
        'control',
        'divider',
        'link',
        'toggle',
    ]);

export const navbar = definePartsStyle(({ theme, ...props }) => {
    const { space } = theme;

    return {
        container: {
            '--background-colour': 'gray.700',

            'display': 'flex',
            'flexDirection': 'row',
            'backgroundColor': 'var(--background-colour)',
            'height': space[64],
            'h': space[64],
            'width': '100%',
            'w': '100%',
            'justifyContent': 'center',

            [mediaQueries.md]: {
                height: space[48],
                h: space[48],
            },
        },
        logo: {
            margin: space[12],
            display: 'none',

            [mediaQueries.md]: {
                display: 'initial',
            },
        },
        title: {
            'height': '100%',
            'display': 'none',
            'color': whiteText,

            '& > p': {
                display: 'flex',
                gap: space[8],
                color: 'white.300',
            },

            [mediaQueries.md]: {
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            },
        },
        control: {
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',

            ...scrollBarStyleLight(theme),

            _dark: {
                ...scrollBarStyleDark(theme),
            },
        },
        divider: {
            display: 'none',
            opacity: 1,
            borderColor: 'red.500',
            margin: 0,
            borderLeftWidth: space[4],

            [mediaQueries.md]: {
                display: 'initial',
            },
        },
        link: {
            '& > a': {
                'borderBottom': `${space[4]} solid`,
                'borderBottomColor': 'transparent',
                'backgroundColor': 'transparent',
                'color': 'inherit',
                'height': '100%',
                'flex': 1,

                '_activeLink': {
                    backgroundColor: 'red.500',
                    color: 'inherit',
                },

                '_hover': {
                    borderBottomColor: 'red.500',
                },

                '& > div': {
                    'display': 'flex',
                    'height': '100%',
                    'width': '100%',
                    'flexDirection': 'column',
                    'padding': space[8],
                    'background': 'inherit',
                    'border': 'inherit',

                    '& > h3': {
                        display: 'initial',
                    },
                },
            },

            [mediaQueries.md]: {
                '& > a': {
                    'flex': 'initial',

                    '& > div > h3': {
                        display: 'none',
                    },
                },
            },
        },
        toggle: {
            'borderBottom': `${space[4]} solid`,
            'borderBottomColor': 'transparent',
            'backgroundColor': 'transparent',
            'color': 'inherit',
            'height': '100%',
            'flex': 1,
            'padding': space[8],
            'cursor': 'pointer',

            '& > button': {
                height: space[24],
                width: space[24],
                minWidth: 'unset',
            },
            '_hover': {
                borderBottomColor: 'red.500',
            },
        },
    };
});

export const Navbar = defineMultiStyleConfig({
    baseStyle: navbar,
});
