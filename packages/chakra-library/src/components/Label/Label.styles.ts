import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig, definePartsStyle } =
    createMultiStyleConfigHelpers([
        'label',
        'tooltip',
        'icon',
        'badge',
        'warning',
    ]);

const label = definePartsStyle(({ theme, colorScheme, ...props }) => {
    return {
        label: {
            marginBottom: '0',
        },
        tooltip: {},
        icon: {
            color: 'gray.600',

            _dark: {
                color: 'gray.300',
            },
        },
        warning: {
            color: 'orange.600',

            _dark: {
                color: 'orange.300',
            },
        },
        badge: {},
    };
});

export const Label = defineMultiStyleConfig({
    baseStyle: label,
});
