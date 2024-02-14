import { modalAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

import { mediaQueries } from '../../theme/devices.config';
import {
    scrollBarStyleLight,
    scrollBarStyleDark,
} from '../../utils/component.utils';
import { darkBackground, lightBackground } from '../../utils/colours.utils';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(modalAnatomy.keys);

const modal = definePartsStyle(({ theme, ...props }) => {
    const { space } = theme;

    return {
        header: {
            'display': 'grid',
            'gridTemplateColumns': `${space[32]} 1fr ${space[32]}`,
            'padding': space[16],
            'minHeight': space[32],

            '& > h4': {
                gridColumn: 2,
                justifySelf: 'center',
                alignSelf: 'center',
                fontSize: space[16],
            },
        },
        overlay: {
            backgroundColor: 'blackAlpha.600',
        },
        dialogContainer: {},
        dialog: {
            '--max-height-sm': `calc(100vh - ${space[128]})`,
            '--margin-bottom-sm': space[64],
            '--position-sm': 'relative',
            '--position-bottom-sm': 'unset',
            '--border-bottom-radius-sm': space[8],

            'borderRadius': space[8],
            'backgroundColor': lightBackground,
            'maxHeight': '90vh',
            'marginBottom': 0,
            'position': 'fixed',
            'bottom': 0,
            'borderBottomRadius': 0,

            '_dark': {
                backgroundColor: darkBackground,
            },

            [mediaQueries.sm]: {
                maxHeight: 'var(--max-height-sm)',
                marginBottom: 'var(--margin-bottom-sm)',
                position: 'var(--position-sm)',
                bottom: 'var(--position-bottom-sm)',
                borderBottomRadius: 'var(--border-bottom-radius-sm)',
            },

            [mediaQueries.md]: {
                maxHeight: `calc(100vh - ${space[128]})`,
                marginBottom: space[64],
                position: 'relative',
                bottom: 'unset',
                borderBottomRadius: space[8],
            },
        },
        closeButton: {
            position: 'relative',
            gridColumn: 3,
            padding: 0,
            display: 'inline-block',
            top: 'unset',
            right: 'unset',
            height: space[32],
            width: space[32],
            transform: `translateY(-${space[4]})`,
        },
        body: {
            padding: `${space[16]} ${space[40]}`,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: space[16],

            ...scrollBarStyleLight(theme),

            _dark: {
                ...scrollBarStyleDark(theme),
            },

            [mediaQueries.sm]: {
                padding: `${space[16]} ${space[56]}`,
            },
        },
        footer: {
            'padding': `${space[24]} ${space[40]} ${space[56]}`,
            'display': 'flex',
            'gap': space[16],

            '& button': {
                width: '100%',
            },

            [mediaQueries.md]: {
                padding: `${space[24]} ${space[56]} ${space[56]}`,
            },
        },
    };
});

export const Modal = defineMultiStyleConfig({
    baseStyle: modal,
});
