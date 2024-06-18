import {
    StyleFunctionProps,
    createMultiStyleConfigHelpers,
} from '@chakra-ui/react';
import { cardAnatomy } from '@chakra-ui/anatomy';

import { blackText, whiteText } from '../../utils/colours.utils';

const { defineMultiStyleConfig, definePartsStyle } =
    createMultiStyleConfigHelpers([...cardAnatomy.keys, 'image']);

const card = definePartsStyle(
    ({ theme, colorScheme, layout, ...props }: StyleFunctionProps) => {
        const { space } = theme;

        return {
            container: {
                boxShadow: 'unset',
            },
            header: {
                'display': 'flex',
                'justifyContent': 'space-between',
                'padding': `${space[16]} ${space[16]} ${space[0]}`,
                'gap': space[24],

                '& > div': {
                    alignItems: 'center',
                    gap: space[16],
                },

                '& svg': {
                    transform: `translateY(-${space[2]})`,
                },
            },
            body: {
                padding: space[16],
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: space[16],
            },
            footer: {
                'display': 'flex',
                'gap': space[16],
                'padding': `${space[0]} ${space[16]} ${space[16]}`,
                'justifyContent': 'flex-end',
                'alignItems': 'center',

                '& > div#footer-icons': {
                    gap: space[8],
                    flex: 1,
                },
            },
            image: {
                objectFit: 'cover',
                borderRadius:
                    layout === 'vertical'
                        ? `${space[6]} ${space[6]} 0 0`
                        : `${space[6]} 0 0 ${space[6]}`,
            },
        };
    }
);

const elevated = definePartsStyle(({ theme, colorScheme, ...props }) => {
    const base = {
        boxShadow: 'md',
        backgroundColor: `${colorScheme}.200`,
    };

    const dark = {
        backgroundColor: `${colorScheme}.500`,
    };

    if (colorScheme === 'white') {
        return {
            container: {
                ...base,
                backgroundColor: `${colorScheme}.300`,

                _dark: {
                    ...dark,
                    color: blackText,
                },
            },
        };
    }

    if (colorScheme === 'black') {
        return {
            container: {
                ...base,
                color: whiteText,

                _dark: {
                    ...dark,
                    color: whiteText,
                },
            },
        };
    }

    return {
        container: {
            ...base,
            _dark: dark,
        },
        header: {},
        body: {},
        footer: {},
    };
});

const filled = definePartsStyle(({ theme, colorScheme, ...props }) => {
    const baseContainer = {
        backgroundColor: `${colorScheme}.200`,
    };

    const darkContainer = {};

    if (colorScheme === 'white') {
        return {
            container: {
                ...baseContainer,
                color: blackText,
            },
        };
    }

    if (colorScheme === 'black') {
        return {
            container: {
                ...baseContainer,
                color: whiteText,
            },
        };
    }

    return {
        container: { ...baseContainer, _dark: darkContainer },
        header: {},
        body: {},
        footer: {},
    };
});

const outline = definePartsStyle(({ theme, colorScheme, ...props }) => {
    const baseContainer = {
        borderColor: `${colorScheme}.300`,
        backgroundColor: `transparent`,
    };

    if (colorScheme === 'white') {
        return {
            container: {
                ...baseContainer,
                borderColor: `${colorScheme}.900`,
            },
        };
    }
    return {
        container: {
            ...baseContainer,
        },
        header: {},
        body: {},
        footer: {},
    };
});

const unstyled = definePartsStyle(({ theme, colorScheme, ...props }) => {
    return {
        container: {},
        header: {},
        body: {},
        footer: {},
    };
});

export const Card = defineMultiStyleConfig({
    baseStyle: card,
    variants: {
        elevated,
        filled,
        outline,
        unstyled,
    },
    defaultProps: {
        colorScheme: 'transparent',
    },
});
