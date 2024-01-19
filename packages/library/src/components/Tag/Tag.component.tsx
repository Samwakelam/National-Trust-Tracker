import React from 'react';

import { PositionType } from 'src/types';

import { IconProps, Icon } from '..';

import * as Chakra from '@chakra-ui/react';

interface TagIconProps extends IconProps {
    position?: PositionType;
}

export interface TagProps extends Chakra.TagProps {
    icon?: TagIconProps;
}

export const Tag = ({ icon, children, ...props }: TagProps) => {
    return (
        <Chakra.Tag
            data-label='tag'
            size='sm'
            px='0.5rem'
            gap='0.25rem'
            {...props}
        >
            {icon && (!icon.position || icon.position === 'left') && (
                <Icon {...icon} />
            )}
            <Chakra.TagLabel>{children}</Chakra.TagLabel>
            {icon && icon.position === 'right' && <Icon {...icon} />}
        </Chakra.Tag>
    );
};
