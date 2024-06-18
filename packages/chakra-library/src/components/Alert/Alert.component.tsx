import React from 'react';

import * as Chakra from '@chakra-ui/react';

interface AlertProps extends Chakra.AlertProps {
    description: string;
}

export const Alert = ({ status, title, description }: AlertProps) => {
    return (
        <Chakra.Alert
            status={status}
            gap={16}
        >
            <Chakra.Flex
                gap={8}
                alignItems='center'
            >
                <Chakra.AlertIcon m={0} />
                <Chakra.AlertTitle>{title}</Chakra.AlertTitle>
            </Chakra.Flex>
            <Chakra.AlertDescription>{description}</Chakra.AlertDescription>
        </Chakra.Alert>
    );
};
