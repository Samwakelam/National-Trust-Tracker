import { mediaQueries } from '../../theme/devices.config';

import * as Chakra from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    Chakra.createMultiStyleConfigHelpers(['container', 'content']);

// heading height is 3rem (48px) Padding top is this plus frame padding-top

export const frame = definePartsStyle(
    ({ theme, colorScheme, isWideWidth, ...props }) => {
        const { space } = theme;

        return {
            container: {
                backgroundColor: `${colorScheme}.300`,
                width: '100%',

                _dark: {
                    backgroundColor: `${colorScheme}.600`,
                },
            },
            content: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: space[24],
                alignItems: 'center',

                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // overflow: 'hidden',

                maxWidth: isWideWidth ? '80rem' : '70rem',
                maxW: isWideWidth ? '80rem' : '70rem',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        };
    }
);

const sm = definePartsStyle(
    ({ theme, colorScheme, size, isCoupled, ...props }) => {
        const { space } = theme;

        return {
            container: {
                paddingX: space[16],
                paddingTop: isCoupled ? space[0] : space[16],
                paddingBottom: space[16],

                [mediaQueries.md]: {
                    paddingX: space[32],
                    paddingTop: isCoupled ? space[0] : space[20],
                    paddingBottom: space[20],
                },

                [mediaQueries.lg]: {
                    paddingX: space[56],
                    paddingTop: isCoupled ? space[0] : space[24],
                    paddingBottom: space[24],
                },
            },
            content: {
                paddingTop: space[16],
                marginTop: `-${space[16]}`,
                gap: space[4],

                [mediaQueries.md]: {
                    paddingTop: space[20],
                    marginTop: `-${space[20]}`,
                    gap: space[8],
                },

                [mediaQueries.lg]: {
                    paddingTop: space[24],
                    marginTop: `-${space[24]}`,
                    gap: space[12],
                },
            },
        };
    }
);

const md = definePartsStyle(
    ({ theme, colorScheme, size, isCoupled, ...props }) => {
        const { space } = theme;

        return {
            container: {
                paddingX: space[16],
                paddingTop: isCoupled ? space[0] : space[16],
                paddingBottom: space[16],

                [mediaQueries.md]: {
                    paddingX: space[32],
                    paddingTop: isCoupled ? space[0] : space[24],
                    paddingBottom: space[24],
                },

                [mediaQueries.lg]: {
                    paddingX: space[56],
                    paddingTop: isCoupled ? space[0] : space[32],
                    paddingBottom: space[32],
                },
            },
            content: {
                paddingTop: space[16],
                marginTop: `-${space[16]}`,
                gap: space[8],

                [mediaQueries.md]: {
                    paddingTop: space[24],
                    marginTop: `-${space[24]}`,
                    gap: space[16],
                },

                [mediaQueries.lg]: {
                    paddingTop: space[32],
                    marginTop: `-${space[32]}`,
                    gap: space[24],
                },
            },
        };
    }
);

const banner = definePartsStyle(({ theme, colorScheme, ...props }) => {
    const { space } = theme;

    return {
        container: {
            paddingX: space[16],
            paddingTop: space[16],
            paddingBottom: space[16],

            [mediaQueries.md]: {
                paddingX: space[32],
            },

            [mediaQueries.lg]: {
                paddingX: space[56],
            },
        },
        content: {
            paddingTop: space[16],
            marginTop: `-${space[16]}`,
            gap: space[16],
        },
    };
});

const lg = definePartsStyle(({ theme, colorScheme, isCoupled, ...props }) => {
    const { space } = theme;

    return {
        container: {
            paddingX: space[16],
            paddingTop: isCoupled ? space[0] : space[56],
            paddingBottom: space[56],

            [mediaQueries.md]: {
                paddingX: space[32],
            },

            [mediaQueries.lg]: {
                paddingX: space[56],
                paddingTop: isCoupled ? space[0] : space[60],
                paddingBottom: space[60],
            },
        },
        content: {
            paddingTop: space[56],
            marginTop: `-${space[56]}`,
            gap: space[16],

            [mediaQueries.md]: {
                paddingTop: space[56],
                marginTop: `-${space[56]}`,
                gap: space[32],
            },

            [mediaQueries.lg]: {
                paddingTop: space[60],
                marginTop: `-${space[60]}`,
                gap: space[56],
            },
        },
    };
});

export const Frame = defineMultiStyleConfig({
    baseStyle: frame,
    sizes: { sm, banner, md, lg },
    defaultProps: {
        colorScheme: 'transparent',
        size: 'sm',
    },
});

// &:global(.global--delegated-padding) {
//     margin: 0 calc(1rem * -1);
//     width: 100vw;

//     @media ${devices.md} {
//         margin: 0 calc(2rem * -1);
//     }

//     /* @media ${devices.lg} {
//     margin: 0 calc(3.5rem * -1);
//     } */

//     @media ${devices.lg} {
//         margin: 0;
//         width: 100%;
//     }
// }
