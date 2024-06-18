import {
    StyleFunctionProps,
    defineStyle,
    defineStyleConfig,
} from '@chakra-ui/react';

const single = defineStyle(({ theme, ...props }: StyleFunctionProps) => {
    return {
        'display': 'flex',
        'width': '100%',

        'div[data-label="InputGroup"]': {
            flexGrow: 2,
        },

        'div[data-label="SelectGroup"]': {
            flexGrow: 1,
            flexShrink: 0,
        },
    };
});

const multi = defineStyle(({ theme, ...props }: StyleFunctionProps) => {
    const { space } = theme;

    return {
        'display': 'flex',
        'width': '100%',

        // NOTE: Do not delete for potentially unsafe when doing server-side rendering error. We need to specify child specifically for the style to work.
        '& > :not(:first-child):not(:last-child)': {
            'input, select': {
                borderRadius: 'unset',
            },
        },

        // NOTE: Do not delete for potentially unsafe when doing server-side rendering error. We need to specify child specifically for the style to work.
        '& > :first-child': {
            'input, select': {
                borderTopRightRadius: 'unset',
                borderBottomRightRadius: 'unset',
            },
        },

        // NOTE: Do not delete for potentially unsafe when doing server-side rendering error. We need to specify child specifically for the style to work.
        '& > :last-child': {
            'input, select, button': {
                borderTopLeftRadius: 'unset',
                borderBottomLeftRadius: 'unset',
            },
        },

        '& > [role="button"] > button': {
            transform: `translateY(26px)`,
            border: `${space[1]} solid`,
            borderColor: 'inherit',

            _dark: {
                borderColor: 'gray.400',
            },
        },
    };
});

const inputAndSelectBar = defineStyle((props: StyleFunctionProps) => {
    const isSingleItem = props.isSingleItem;

    if (isSingleItem) return single(props);

    return multi(props);
});

export const InputAndSelectBar = defineStyleConfig({
    baseStyle: inputAndSelectBar,
});
