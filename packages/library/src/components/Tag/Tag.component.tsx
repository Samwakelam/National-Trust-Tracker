import React from 'react';

import { PositionType } from '../../types';

import { IconProps, Icon } from '..';

import * as Chakra from '@chakra-ui/react';

interface TagIconProps extends IconProps {
    position?: PositionType;
}

export interface TagProps extends Chakra.TagProps {
    icon?: TagIconProps;
    tooltip?: Omit<Chakra.TooltipProps, 'children'>;
}

export const TagComponent = ({ icon, children, ...props }: TagProps) => {
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

export const Tag = ({ tooltip, ...props }: TagProps) => {
    if (tooltip) {
        return (
            <Chakra.Tooltip {...tooltip}>
                <span>
                    <TagComponent {...props} />
                </span>
            </Chakra.Tooltip>
        );
    }

    return <TagComponent {...props} />;
};
