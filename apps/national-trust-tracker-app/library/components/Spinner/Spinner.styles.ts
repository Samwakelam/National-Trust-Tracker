import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const spinner = defineStyle(({ theme, ...props }) => {
    const { space } = theme;
    return {};
});

export const Spinner = defineStyleConfig({
    baseStyle: spinner,
});
