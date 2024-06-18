import React from 'react';

import { Children } from '../../types';
import { HeadingProps } from '../Heading';

import * as Chakra from '@chakra-ui/react';

interface PopoverProps extends Chakra.PopoverProps {
    children: Children;
    anchor?: Children;
    body: Children;
    heading?: HeadingProps;
}

export const Popover = ({
    children,
    anchor,
    body,
    heading,
    ...props
}: PopoverProps) => {
    return (
        <Chakra.Popover {...props}>
            {anchor && <Chakra.PopoverAnchor>{anchor}</Chakra.PopoverAnchor>}
            <Chakra.PopoverTrigger>{children}</Chakra.PopoverTrigger>
            <Chakra.PopoverContent>
                <Chakra.PopoverArrow />
                <Chakra.PopoverCloseButton />
                {heading && <Chakra.PopoverHeader {...heading} />}
                <Chakra.PopoverBody>{body}</Chakra.PopoverBody>
            </Chakra.PopoverContent>
        </Chakra.Popover>
    );
};
