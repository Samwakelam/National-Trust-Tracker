import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig, definePartsStyle } =
    createMultiStyleConfigHelpers(['label', 'tooltip', 'icon', 'badge']);

const label = definePartsStyle(({ theme, colorScheme, ...props }) => {
    return {
        label: {},
        tooltip: {},
        icon: {
            color: 'gray.600',

            _dark: {
                color: 'gray.300',
            },
        },
        badge: {},
    };
});

export const Label = defineMultiStyleConfig({
    baseStyle: label,
});
