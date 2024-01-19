import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig, definePartsStyle } =
    createMultiStyleConfigHelpers([
        'container',
        'link',
        'menu',
        'subMenu',
        'subMenuLink',
    ]);

const sideMenu = definePartsStyle(({ theme, colorScheme, ...props }) => {
    const { space } = theme;

    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            h: '100%',
        },
        link: {
            'display': 'flex',
            'alignItems': 'center',
            'gap': space[8],
            'padding': `${space[20]} ${space[32]}`,
            'backgroundColor': `${colorScheme}.200`,
            'borderRadius': space[4],
            'cursor': 'pointer',

            '_hover': {
                backgroundColor: `${colorScheme}.300`,
            },

            '&[data-active="true"]': {
                backgroundColor: 'red.500',
                color: 'white.300',
            },

            '_dark': {
                backgroundColor: `${colorScheme}.500`,

                _hover: {
                    backgroundColor: `${colorScheme}.400`,
                },
            },
        },
        menu: {
            display: 'flex',
            flexDirection: 'column',
            gap: space[16],
            flex: 1,
            margin: 0,
        },
        subMenu: {
            display: 'flex',
            flexDirection: 'column',
            flex: 0,
            borderTop: `${space[2]} solid`,
            borderColor: `${colorScheme}.200`,
            margin: `0 -${space[32]} -${space[16]}`,
            padding: `${space[16]} ${space[32]} 0`,

            _dark: {
                borderColor: `${colorScheme}.600`,
            },
        },
        subMenuLink: {
            'display': 'flex',
            'alignItems': 'center',
            'gap': space[8],
            'padding': `${space[2]} ${space[8]}`,
            'color': `${colorScheme}.400`,
            'cursor': 'pointer',
            'borderRadius': space[2],

            '_hover': {
                backgroundColor: `${colorScheme}.100`,
            },

            '&[data-active="true"]': {
                color: 'red.500',

                _hover: {
                    backgroundColor: 'unset',
                },
            },

            '_dark': {
                color: `${colorScheme}.500`,

                _hover: {
                    backgroundColor: `${colorScheme}.600`,
                },
            },
        },
    };
});

export const SideMenu = defineMultiStyleConfig({
    baseStyle: sideMenu,
    defaultProps: {
        colorScheme: 'gray',
    },
});
