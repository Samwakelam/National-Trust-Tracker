import React from 'react';

import { Card, CardProps } from '../Card/Card.component';
import { Heading } from '../Heading';

import * as Chakra from '@chakra-ui/react';

interface SectionProps extends Pick<CardProps, 'children'> {
    heading: string;
}

interface GroupProps extends Pick<CardProps, 'children'> {
    direction?: Chakra.StyleProps['flexDirection'];
}

const Group = ({ children, direction }: GroupProps) => {
    return (
        <Chakra.Flex
            gap={8}
            direction={direction ? direction : ['column', 'column', 'row']}
            width='100%'
        >
            {children}
        </Chakra.Flex>
    );
};

const Section = ({ heading, children }: SectionProps) => {
    return (
        <Chakra.Flex
            direction='column'
            gap={16}
        >
            <Heading preset='sub-heading'>{heading}</Heading>

            <Chakra.Flex
                direction='column'
                gap={8}
            >
                {children}
            </Chakra.Flex>
        </Chakra.Flex>
    );
};

const CardForm = ({ children, ...props }: CardProps) => {
    return (
        <Card
            data-label='card-form-container'
            variant='outline'
            colorScheme='gray'
            h='100%'
            {...props}
        >
            {children}
        </Card>
    );
};

CardForm.Group = Group;
CardForm.Section = Section;

export { CardForm };
