import { VariantProps, cva } from 'class-variance-authority';

import { colorScheme } from '../../utilities/colorScheme.util';

// MARK: Tag Styles

export const tagStyles = cva(
    [
        'flex flex-row gap-4 w-fit items-center text-12 px-12 py-2 rounded-full border-transparent border border-solid',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                solid: ['bg-[--color-400] text-white-300'],
                soft: ['bg-[--color-200]'],
                outline: ['border-[--color-400]'],
                solidOutline: ['bg-[--color-200] border-[--color-400]'],
            },
        },
        compoundVariants: [
            {
                divergent: ['soft', 'solidOutline'],
                colorScheme: 'black',
                className: 'text-white-100',
            },
            {
                divergent: 'solid',
                colorScheme: 'white',
                className: 'text-black-100 bg-[--color-50]',
            },
            {
                divergent: ['solidOutline', 'outline'],
                colorScheme: 'white',
                className: 'border-[--color-50]',
            },
        ],
        defaultVariants: {
            divergent: 'solid',
            colorScheme: 'slate',
        },
    }
);

export type TagStyles = VariantProps<typeof tagStyles>;
