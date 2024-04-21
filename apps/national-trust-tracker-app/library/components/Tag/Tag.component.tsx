import React, { ReactElement, ReactNode } from 'react';
import { Icon, IconProps } from '../Icon';

export type TagProps = { children?: ReactNode; icon?: IconProps };

export const Tag = ({ children, icon }: TagProps): ReactElement<TagProps> => {
    return (
        <span
            data-label='tag'
            className='flex flex-row gap-4 w-fit items-center bg-slate-200 text-14 px-12 py-2 rounded-full'
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
