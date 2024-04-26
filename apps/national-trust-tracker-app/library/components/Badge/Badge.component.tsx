import React, { ReactElement, ReactNode } from 'react';
import { Icon, IconProps } from '../Icon';

export type BadgeProps = { children?: ReactNode; icon?: IconProps };

export const Badge = ({
    children,
    icon,
}: BadgeProps): ReactElement<BadgeProps> => {
    return (
        <span
            data-label='badge'
            className='flex flex-row gap-4 w-fit items-center bg-slate-200 text-12 text-slate-700 capitalize font-semibold px-4 py-0 rounded-4'
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
