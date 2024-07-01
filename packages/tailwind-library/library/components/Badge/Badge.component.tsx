import React, { ReactElement, ReactNode } from 'react';

import { Icon } from '../Icon/Icon.component';
import { IconProps } from '../Icon/Icon.definition';

import { BadgeStyles, badgeStyles } from './Badge.styles';
import { twMerge } from '../../utilities/twMerge.util';

export interface BadgeProps extends BadgeStyles {
    children?: ReactNode;
    icon?: IconProps;
    className?: string;
}

export const Badge = ({
    colorScheme,
    children,
    divergent,
    icon,
    className,
}: BadgeProps): ReactElement<BadgeProps> => {
    const styles = badgeStyles({ divergent, colorScheme, className });

    return (
        <span
            data-label='badge'
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
