import * as Chakra from '@chakra-ui/react';

type HeadingType = 'sub-heading' | 'frame-heading';

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
        default:
            return <Chakra.Heading {...props} />;
    }
};
