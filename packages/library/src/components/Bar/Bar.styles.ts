import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

import { mediaQueries } from '../../theme/devices.config';
import {
    resolveBackgroundColor,
    resolveBorderColor,
    resolveColor,
    resolveMenuBackgroundColor,
} from './Bar.utils';

const { defineMultiStyleConfig, definePartsStyle } =
    createMultiStyleConfigHelpers(['container', 'content', 'menuButton']);

const bar = definePartsStyle(({ theme, colorScheme, ...props }) => {
    const { space } = theme;

    return {
        container: {
            'position': 'relative',
            'width': '100%',
            'display': 'flex',
            'flexDirection': 'column',
            'padding': '0',

            'borderTopStyle': 'solid',
            'borderBottomStyle': 'solid',
            'borderWidth': space[2],
            'borderColor': resolveBorderColor(colorScheme, 'light'),

            'backgroundColor': resolveBackgroundColor(colorScheme, 'light'),

            '& h1, h2, h3, h4, h5, p': {
                color: resolveColor(colorScheme, 'light'),
            },

            '_dark': {
                'borderColor': resolveBorderColor(colorScheme, 'dark'),
                'backgroundColor': resolveBackgroundColor(colorScheme, 'dark'),

                '& h1, h2, h3, h4, h5, p': {
                    color: resolveColor(colorScheme, 'dark'),
                },
            },

            [mediaQueries.sm]: {
                flexDirection: 'row',
            },
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: '100%',

            [mediaQueries.sm]: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 16,
            },
        },
        menuButton: {
            'backgroundColor': resolveMenuBackgroundColor(colorScheme, 'light'),
            'borderRadius': '0',

            '_dark': {
                backgroundColor: resolveMenuBackgroundColor(
                    colorScheme,
                    'dark'
                ),
            },

            '& > [role="button"] > button': {
                borderRadius: '0',
                minWidth: space[40],
            },

            [mediaQueries.sm]: {
                '& > [role="button"]': {
                    '& button': {
                        height: '100%',
                    },
                    'height': '100%',
                    'minWidth': space[40],
                },
            },
        },
    };
});

const sm = definePartsStyle(({ theme, colorScheme, ...props }) => {
    const { space } = theme;

    return {
        container: {},
        content: {
            padding: `${space[8]} ${space[16]}`,

            [mediaQueries.sm]: {
                padding: `${space[16]} ${space[40]}`,
            },

            [mediaQueries.lg]: {
                padding: `${space[20]} ${space[64]}`,
            },
        },
        menuButton: {
            '& > button': {
                height: space[24],
            },
        },
    };
});

const lg = definePartsStyle(({ theme, colorScheme, ...props }) => {
    const { space } = theme;

    return {
        container: {},
        content: {
            padding: `${space[24]} ${space[32]}`,

            [mediaQueries.sm]: {
                padding: `${space[32]} ${space[56]}`,
            },

            [mediaQueries.lg]: {
                padding: `${space[40]} ${space[64]}`,
            },
        },
        menuButton: {
            '& > button': {
                height: space[40],
            },
        },
    };
});

export const Bar = defineMultiStyleConfig({
    baseStyle: bar,
    sizes: { sm, lg },
    defaultProps: {
        colorScheme: 'gray',
        size: 'lg',
    },
});
