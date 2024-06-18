import { alertAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig, definePartsStyle } =
    createMultiStyleConfigHelpers(alertAnatomy.keys);

const alert = definePartsStyle(({ theme, ...props }) => {
    const { space } = theme;

    return {
        container: {
            'padding': `${space[8]} ${space[16]}`,
            'gap': 4,

            '& > button': {
                top: space[12],
                right: space[16],
            },
        },
        title: {},
        description: {},
        icon: {
            height: space[16],
            marginTop: space[4],
        },
        spinner: {},
    };
});

export const Alert = defineMultiStyleConfig({ baseStyle: alert });
