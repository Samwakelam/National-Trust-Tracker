import { popoverAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(popoverAnatomy.keys);

const popover = definePartsStyle(({ theme, colorScheme, ...props }) => {
    const { space } = theme;

    return {
        content: {},
        header: {},
        body: {},
        footer: {},
        popper: {},
        arrow: {},
        closeButton: {},
    };
});

export const Popover = defineMultiStyleConfig({
    baseStyle: popover,
});
