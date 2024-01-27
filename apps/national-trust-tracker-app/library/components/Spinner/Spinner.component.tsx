'use client';
import React, { ReactElement } from 'react';

import * as Chakra from '@chakra-ui/react';

interface SpinnerProps extends Chakra.SpinnerProps {
    isPageSpinner?: boolean;
}

export const Spinner = ({
    isPageSpinner,
    size = 'xl',
    ...props
}: SpinnerProps): ReactElement<SpinnerProps> => {
    const sx = {
        '--spinner-size': resolveSpinnerSize(size),
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

const resolveSpinnerSize = (size: SpinnerProps['size']) => {
    switch (size) {
        case 'xs':
            return '4px';
        case 'sm':
            return '8px';
        case 'md':
            return '16px';
        case 'lg':
            return '32px';
        case 'xl':
            return '48px';
        default:
            return '16px';
    }
};
