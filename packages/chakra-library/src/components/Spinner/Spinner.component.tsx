import React from 'react';

import * as Chakra from '@chakra-ui/react';

interface SpinnerProps extends Chakra.SpinnerProps {
    isPageSpinner?: boolean;
}

export const Spinner = ({
    isPageSpinner,
    size = 'xl',
    ...props
}: SpinnerProps) => {
    const theme = Chakra.useTheme();

    const sx = {
        '--spinner-size': resolveSpinnerSize(size, theme),
    };

    if (!isPageSpinner)
        return (
            <Chakra.Spinner
                sx={sx}
                size={size}
                color='red.500'
                {...props}
            />
        );

    return (
        <Chakra.Flex
            w='100vw'
            flex={1}
            mt={4}
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            overflow='hidden'
            h='100vh'
        >
            <Chakra.Spinner
                sx={sx}
                size={size}
                color='red.500'
                {...props}
            />
        </Chakra.Flex>
    );
};

const resolveSpinnerSize = (
    size: SpinnerProps['size'],
    theme: Chakra.StyleFunctionProps['theme']
) => {
    const { space } = theme;

    switch (size) {
        case 'xs':
            return space[4];
        case 'sm':
            return space[8];
        case 'md':
            return space[16];
        case 'lg':
            return space[32];
        case 'xl':
            return space[48];
    }
};
