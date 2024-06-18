import { ReactElement, ReactNode } from 'react';

import * as Chakra from '@chakra-ui/react';

interface ContainerPageProps extends Chakra.FlexProps {
    children: ReactElement | ReactNode;
}

export const ContainerPage = ({ children, ...props }: ContainerPageProps) => {
    return (
        <Chakra.Flex
            as='main'
            data-label='container-page'
            width='100%'
            height='100%'
            overflow='hidden'
            position='relative'
            {...props}
        >
            {children}
        </Chakra.Flex>
    );
};
