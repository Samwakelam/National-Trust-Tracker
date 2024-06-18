import {
    SystemStyleFunction,
    defineStyle,
    defineStyleConfig,
} from '@chakra-ui/react';

import { blackText, whiteText } from '../../utils/colours.utils';

// NOTE: Bug in chakra system, you have to override both long and shorthand props for it to work in baseStyles

const button: SystemStyleFunction = ({ theme, size, ...props }) => {
    const { space } = theme;

    const resolveWidth = (size: any) => {
        switch (size) {
            case 'xs':
                return space[32];
            case 'sm':
                return space[36];
            case 'lg':
                return space[44];

            default:
                return space[40];
        }
    };

    return {
        h: space[40],
        height: space[40],
        minW: resolveWidth(size),
        minWidth: resolveWidth(size),
        paddingInlineEnd: 'unset',
        paddingInlineStart: 'unset',
        padding: `0 ${space[16]}`,
        position: `relative`,
        textTransform: 'capitalize',
    };
};

const blackGradient = `linear-gradient(-15deg, black.500 0%, gray.600 100%)`;

export const elevated = defineStyle(({ theme, colorScheme, ...props }) => {
    const { space, colors, shadows } = theme;

    const base = {
        boxShadow: 'md',
        backgroundColor: `${colorScheme}.100`,
        backgroundImage: `linear-gradient(-15deg, ${colorScheme}.400 0%, ${colorScheme}.300 100%)`,
    };

    const hover = {
        backgroundColor: `${colorScheme}.200`,
        backgroundImage: `linear-gradient(-15deg, ${colorScheme}.500 0%, ${colorScheme}.300 100%)`,
    };

    const active = {
        backgroundColor: `${colorScheme}.300`,
        backgroundImage: `linear-gradient(-15deg, ${colorScheme}.200 0%, ${colorScheme}.400 100%)`,
        boxShadow: shadows.md
            .split('),')
            .map((shadow: string) => `inset ${shadow}`)
            .join('),'),
    };

    const dark = {
        boxShadow: `${space[4]} ${space[4]} ${space[6]} ${colors.blackAlpha[400]}, -${space[0]} -${space[2]} ${space[4]} -${space[1]} ${colors.blackAlpha[400]}`,
        backgroundColor: `${colorScheme}.400`,
        backgroundImage: `linear-gradient(-15deg, ${colorScheme}.700 0%, ${colorScheme}.400 100%)`,

        _hover: {
            ...hover,
            backgroundColor: `${colorScheme}.300`,
            backgroundImage: `linear-gradient(-15deg, ${colorScheme}.700 0%, ${colorScheme}.300 100%)`,
        },

        _active: {
            ...active,
            backgroundImage: `linear-gradient(-15deg, ${colorScheme}.300 0%, ${colorScheme}.700 100%)`,
        },
    };

    if (colorScheme === 'white') {
        return {
            ...base,
            color: blackText,
            backgroundColor: `${colorScheme}.300`,
            backgroundImage: `linear-gradient(-15deg, white.600 0%, white.300 100%)`,

            _hover: {
                ...hover,
                backgroundColor: `${colorScheme}.50`,
                backgroundImage: `linear-gradient(-15deg, ${colorScheme}.50 0%, ${colorScheme}.300 100%)`,
            },

            _active: {
                ...active,
            },

            _dark: {
                ...dark,
                backgroundColor: `${colorScheme}.400`,
                backgroundImage: `linear-gradient(-15deg, gray.300 0%, white.400 100%)`,

                _active: {
                    ...active,
                },
            },
        };
    }

    if (colorScheme === 'black') {
        return {
            ...base,
            color: whiteText,
            backgroundImage: blackGradient,

            _hover: {
                ...hover,
                backgroundImage: `linear-gradient(-15deg, black.400 0%, gray.500 100%)`,
            },

            _active: {
                ...active,
            },

            _dark: {
                ...dark,
                backgroundImage: blackGradient,

                _hover: {
                    ...hover,
                    backgroundImage: `linear-gradient(-15deg, black.800 0%, gray.600 100%)`,
                },

                _active: {
                    ...active,
                },
            },
        };
    }

    return {
        ...base,
        _hover: hover,
        _active: active,
        _dark: dark,
    };
});

export const ghost = defineStyle(({ theme, colorScheme, ...props }) => {
    const base = {};

    const hover = {
        backgroundColor: `${colorScheme}.100`,
    };

    const dark = {
        color: whiteText,

        _hover: {
            ...hover,
            backgroundColor: `${colorScheme}.500`,
        },
    };

    if (colorScheme === 'gray') {
        return {
            ...base,
            color: 'gray.700',

            _hover: {
                ...hover,
                backgroundColor: 'gray.100',
            },

            _dark: {
                ...dark,
                _hover: {
                    ...hover,
                    backgroundColor: 'gray.500',
                },
            },
        };
    }

    if (colorScheme === 'white') {
        return {
            ...base,
            color: blackText,
            backgroundColor: 'transparent',

            _hover: hover,

            _dark: {
                ...dark,

                _hover: {
                    ...hover,
                    color: blackText,
                },
            },
        };
    }

    if (colorScheme === 'black') {
        return {
            ...base,

            _hover: {
                ...hover,
                backgroundColor: 'gray.500',
            },

            _active: {
                color: whiteText,
                backgroundColor: 'black.200',
            },

            _dark: dark,
        };
    }

    return {
        ...base,
        _hover: hover,
        _dark: dark,
    };
});

// '& button': {
//     backgroundColor: `${colorScheme}.100`,
//     backgroundImage: `linear-gradient(-15deg, ${colorScheme}.200 0%, ${colorScheme}.100 100%);`,

//     _hover: {
//         backgroundColor: `${colorScheme}.200`,
//         backgroundImage: `linear-gradient(-15deg, ${colorScheme}.300 0%, ${colorScheme}.100 100%);`,
//     },

//     _active: {
//         backgroundColor: `${colorScheme}.100`,
//         backgroundImage: `linear-gradient(-15deg, ${colorScheme}.100 0%, ${colorScheme}.300 100%);`,
//     },
// },

export const gradient = defineStyle(({ theme, colorScheme, ...props }) => {
    const base = {
        backgroundColor: `${colorScheme}.100`,
        backgroundImage: `linear-gradient(-15deg, ${colorScheme}.300 0%, ${colorScheme}.100 100%)`,
    };

    const hover = {
        backgroundColor: `${colorScheme}.300`,
        backgroundImage: `linear-gradient(-15deg, ${colorScheme}.300 0%, ${colorScheme}.200 100%)`,
    };

    const active = {
        backgroundColor: `${colorScheme}.300`,
        backgroundImage: `linear-gradient(-15deg, ${colorScheme}.100 0%, ${colorScheme}.300 100%)`,
    };

    const dark = {
        backgroundColor: `${colorScheme}.400`,
        backgroundImage: `linear-gradient(-15deg, ${colorScheme}.600 0%, ${colorScheme}.400 100%)`,

        _hover: {
            ...hover,
            backgroundColor: `${colorScheme}.300`,
            backgroundImage: `linear-gradient(-15deg, ${colorScheme}.600 0%, ${colorScheme}.300 100%)`,
        },

        _active: {
            ...active,
            backgroundImage: `linear-gradient(-15deg, ${colorScheme}.300 0%, ${colorScheme}.700 100%)`,
        },
    };

    if (colorScheme === 'white') {
        return {
            ...base,
            color: blackText,
            backgroundColor: `${colorScheme}.300`,
            backgroundImage: `linear-gradient(-15deg, white.600 0%, white.300 100%)`,

            _hover: {
                ...hover,
                backgroundColor: `${colorScheme}.50`,
                backgroundImage: `linear-gradient(-15deg, ${colorScheme}.50 0%, ${colorScheme}.300 100%)`,
            },

            _active: {
                ...active,
            },

            _dark: {
                ...dark,

                backgroundColor: `${colorScheme}.400`,
                backgroundImage: `linear-gradient(-15deg, gray.300 0%, white.400 100%)`,
            },
        };
    }

    if (colorScheme === 'black') {
        return {
            ...base,
            color: whiteText,
            backgroundImage: blackGradient,

            _hover: {
                ...hover,
                backgroundImage: `linear-gradient(-15deg, black.400 0%, gray.500 100%)`,
            },

            _active: {
                ...active,
                backgroundImage: `linear-gradient(-15deg, ${colorScheme}.50 0%, ${colorScheme}.700 100%)`,
            },

            _dark: {
                ...dark,
                backgroundImage: blackGradient,

                _hover: {
                    ...hover,
                    backgroundImage: `linear-gradient(-15deg, black.800 0%, gray.600 100%)`,
                },
            },
        };
    }

    return {
        ...base,
        _hover: hover,
        _active: active,
        _dark: dark,
    };
});

export const outline = defineStyle(({ theme, colorScheme, ...props }) => {
    const base = {};

    const hover = {
        backgroundColor: `${colorScheme}.100`,
    };

    const dark = {
        color: `${colorScheme}.200`,

        _hover: {
            ...hover,
            backgroundColor: `${colorScheme}.600`,
            color: whiteText,
        },
    };

    if (colorScheme === 'white') {
        return {
            ...base,
            color: blackText,
            backgroundColor: 'transparent',
            borderColor: 'white.300',

            _hover: hover,

            _dark: {
                ...dark,

                _hover: {
                    ...hover,
                    backgroundColor: `${colorScheme}.900`,
                    color: blackText,
                },
            },
        };
    }

    if (colorScheme === 'black') {
        return {
            ...base,

            _hover: {
                ...hover,
                backgroundColor: 'gray.500',
            },

            _active: {
                color: whiteText,
                borderColor: `black.900`,
                backgroundColor: 'black.200',
            },

            _dark: {
                ...dark,
                color: whiteText,
            },
        };
    }

    if (colorScheme === 'gray') {
        return {
            ...base,
            borderColor: 'gray.300',

            _hover: {
                ...hover,
                backgroundColor: 'gray.200',
            },

            _dark: {
                ...dark,
                borderColor: 'gray.500',
                _hover: {
                    ...hover,
                },
            },
        };
    }

    const whitelist = ['orange', 'pink', 'red'];
    if (whitelist.includes(colorScheme)) {
        return {
            ...base,
            _hover: hover,
            _dark: {
                ...dark,
                color: `${colorScheme}.400`,
            },
        };
    }

    return { ...base, _hover: hover, _dark: dark };
});

export const solid = defineStyle(({ theme, colorScheme, ...props }) => {
    const dark = {
        color: whiteText,
        backgroundColor: `${colorScheme}.500`,

        _hover: {
            backgroundColor: `${colorScheme}.400`,
        },

        _active: {
            backgroundColor: `${colorScheme}.600`,
        },
    };

    if (colorScheme === 'white') {
        return {
            color: blackText,
            backgroundColor: 'white.50',

            _hover: {
                backgroundColor: 'white.200',
            },

            _dark: {
                ...dark,
                color: blackText,

                _hover: {
                    backgroundColor: `${colorScheme}.50`,
                },

                _active: {
                    backgroundColor: `${colorScheme}.50`,
                },
            },
        };
    }

    if (colorScheme === 'black') {
        return {
            color: whiteText,
            backgroundColor: 'black.200',

            _hover: {
                backgroundColor: 'black.50',
            },

            _active: {
                backgroundColor: 'black.500',
            },

            _dark: {
                _hover: {
                    backgroundColor: 'black.500',
                },
            },
        };
    }

    if (colorScheme === 'gray') {
        return {
            color: blackText,
            backgroundColor: 'gray.300',

            _hover: {
                backgroundColor: 'gray.400',
            },

            _active: {
                backgroundColor: 'gray.400',
            },
        };
    }

    const whitelist = ['orange', 'pink', 'red'];
    if (whitelist.includes(colorScheme)) {
        return {
            _dark: {
                ...dark,
                _hover: {
                    backgroundColor: `${colorScheme}.600`,
                },
            },
        };
    }
    return { _dark: dark };
});

const xs = defineStyle(({ theme, ...props }) => {
    const { space } = theme;

    return {
        height: space[32],
        padding: `0 ${space[8]}`,
    };
});

const sm = defineStyle(({ theme, ...props }) => {
    const { space } = theme;

    return {
        height: space[36],
        padding: `0 ${space[12]}`,
    };
});

const lg = defineStyle(({ theme, ...props }) => {
    const { space } = theme;

    return {
        height: space[44],
        padding: `0 ${space[20]}`,
    };
});

export const Button = defineStyleConfig({
    baseStyle: button,
    variants: {
        elevated,
        ghost,
        gradient,
        outline,
        solid,
    },
    sizes: {
        xs,
        sm,
        lg,
    },
    defaultProps: {
        variant: 'solid',
    },
});
