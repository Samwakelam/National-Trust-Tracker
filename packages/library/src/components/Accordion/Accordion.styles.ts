import { accordionAnatomy } from '@chakra-ui/anatomy';
import {
    StyleFunctionProps,
    createMultiStyleConfigHelpers,
} from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers([...accordionAnatomy.keys, 'title']);

const single = ({ theme, colorScheme, ...props }: StyleFunctionProps) => {
    const { space } = theme;

    return {
        root: {
            width: '100%',
        },
        panel: {
            padding: `${space[16]} 0 ${space[20]}`,
        },
        container: {
            border: 'unset',
        },
        icon: {
            display: 'none',
        },
        button: {
            'textTransform': 'capitalize',
            'minWidth': space,
            'position': `relative`,
            'paddingInlineStart': 'unset',
            'paddingInlineEnd': 'unset',
            'height': space[40],
            'padding': `0 ${space[16]}`,
            'backgroundColor': `${colorScheme}.100`,
            'justifyContent': 'center',
            'borderRadius': '0.375rem',

            '& h3': {
                width: '100%',
                textAlign: 'center',
                fontSize: 14,
            },

            '_hover': {
                backgroundColor: `${colorScheme}.200`,
            },
        },
    };
};

const multi = ({ theme, colorScheme, ...props }: StyleFunctionProps) => {
    const { space } = theme;
    return {
        root: {
            width: '100%',
        },
        button: {
            textAlign: 'left',
            alignItems: 'center',
            gap: space[8],
            position: 'relative',
            _hover: {
                backgroundColor: `${colorScheme}.100`,
            },
        },
        title: {
            'display': 'flex',
            'flexDirection': 'row',
            'gap': space[8],
            'flexGrow': 1,

            '& > h3': {
                fontSize: 14,
            },
        },
        container: {},
        panel: {
            padding: `${space[16]} ${space[16]} ${space[20]}`,
        },
        icon: {},
    };
};

const accordion = definePartsStyle((props) => {
    const isSingleItem = props['data-is-single-item'];

    if (isSingleItem) return single(props);

    return multi(props);
});

export const Accordion = defineMultiStyleConfig({
    baseStyle: accordion,
    defaultProps: {
        colorScheme: 'gray',
    },
});
