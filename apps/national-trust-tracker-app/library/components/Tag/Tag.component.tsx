import React, { ReactElement, ReactNode } from 'react';

export type TagProps = { children?: ReactNode };

export const Tag = ({ children }: TagProps): ReactElement<TagProps> => {
    return (
        <span
            data-label='tag'
            className='bg-zinc-200 text-14 px-8 py-2 rounded-full'
        >
            {children}
        </span>
    );
};
