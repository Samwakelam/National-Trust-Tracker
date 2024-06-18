import React from 'react';

import * as Chakra from '@chakra-ui/react';

type HeadingType = 'sub-heading' | 'frame-heading' | 'modal-heading';

export interface HeadingProps extends Chakra.HeadingProps {
    preset?: HeadingType;
}

export const Heading = ({ preset, ...props }: HeadingProps) => {
    switch (preset) {
        case 'sub-heading':
            return (
                <Chakra.Heading
                    as='h6'
                    size='sm'
                    mb={16}
                    {...props}
                />
            );
        case 'frame-heading':
            return (
                <Chakra.Heading
                    as='h2'
                    {...props}
                />
            );
        case 'modal-heading': {
            return (
                <Chakra.Heading
                    as='h5'
                    w='100%'
                    textAlign='center'
                    size='lg'
                    textTransform='uppercase'
                    {...props}
                />
            );
        }
        default:
            return <Chakra.Heading {...props} />;
    }
};
