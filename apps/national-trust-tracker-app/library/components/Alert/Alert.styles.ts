import { VariantProps, cva } from 'class-variance-authority';

import { colorScheme } from '../../utilities/colorScheme.util';

export const alertStyles = cva(
    ['w-full flex flex-row gap-16 px-16 py-8 justify-center z-30'],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                solid: ['bg-[--color-400] text-[--color-700]'],
                soft: ['bg-[--color-200] text-[--color-700]'],
            },
        },
        compoundVariants: [],
        defaultVariants: { colorScheme: 'slate', divergent: 'soft' },
    }
);

export type AlertStyles = VariantProps<typeof alertStyles>;
