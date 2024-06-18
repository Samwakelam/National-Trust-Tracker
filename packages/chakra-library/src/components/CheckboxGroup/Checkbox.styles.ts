import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { checkboxAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(checkboxAnatomy.keys);

export const checkbox = definePartsStyle(({ theme, colorScheme, ...props }) => {
    const { space, colors } = theme;

    return {
        control: {
            height: space[16],
            width: space[16],
            backgroundColor: `white.100`,

            _checked: {
                backgroundColor: `${colorScheme}.400`,
            },

            _disabled: {
                background: 'transparent',
                border: `${space[1]} solid ${colors.gray[300]}`,

                _dark: {
                    borderColor: 'gray.500',
                },
            },

            _dark: {
                borderColor: 'gray.400',
            },
        },
        label: {
            transform: `translateY(${space[2]})`,
        },
        container: {
            background: 'unset',
        },
    };
});

export const Checkbox = defineMultiStyleConfig({
    baseStyle: checkbox,
    variants: {},
    defaultProps: {
        colorScheme: 'gray',
        size: 'md',
    },
});
