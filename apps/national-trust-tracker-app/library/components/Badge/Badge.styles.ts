import { VariantProps, cva } from 'cva';

import { colorScheme } from '../../utilities/colorScheme.util';

// MARK: Badge Styles

export const badgeStyles = cva(
    [
        'flex flex-row gap-4 w-fit items-center text-12 capitalize font-semibold px-4 py-0 rounded-4 border border-transparent border-solid',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                solid: ['bg-[--color-400] text-[--color-700]'],
                soft: ['bg-[--color-200] text-[--color-700]'],
                outline: ['border-[--color-400] text-[--color-700]'],
                solidOutline: [
                    'bg-[--color-200] border-[--color-400] text-[--color-700]',
                ],
            },
        },
        compoundVariants: [
            {
                divergent: ['soft', 'solidOutline', 'solid'],
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

export type BadgeStyles = VariantProps<typeof badgeStyles>;
