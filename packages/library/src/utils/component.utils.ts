import { StyleFunctionProps } from '@chakra-ui/theme-tools';

export const scrollBarStyleLight = (theme: StyleFunctionProps['theme']) => {
    const { space } = theme;

    return {
        '&::-webkit-scrollbar': {
            width: space[8],
            height: space[8],
            paddingLeft: space[8],
        },

        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray.500',
            borderRadius: space[4],
        },
    };
};

export const scrollBarStyleDark = (theme: StyleFunctionProps['theme']) => {
    const { space } = theme;

    return {
        '&::-webkit-scrollbar': {
            width: space[8],
            height: space[8],
            paddingLeft: space[8],
        },

        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray.700',
            borderRadius: space[4],
        },
    };
};
