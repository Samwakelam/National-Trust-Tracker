import React, { ReactElement, ReactNode } from 'react';

import { twMerge } from '../../utilities/twMerge.util';

import { Icon, IconProps } from '../Icon';

import { TagStyles, tagStyles } from './Tag.styles';

// MARK: Types

export interface TagProps extends TagStyles {
    children?: ReactNode;
    icon?: IconProps;
}

// MARK: Tag

export const Tag = ({
    children,
    icon,
    divergent,
    colorScheme,
}: TagProps): ReactElement<TagProps> => {
    const styles = tagStyles({ divergent, colorScheme });

    // MARK: Return

    return (
        <span
            data-label='tag'
            className={twMerge(styles)}
        >
            {icon && (
                <Icon
                    className='w-16 h-16'
                    {...icon}
                />
            )}
            {children}
        </span>
    );
};
