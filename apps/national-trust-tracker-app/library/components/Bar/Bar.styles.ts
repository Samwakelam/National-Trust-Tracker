import { VariantProps, cva } from 'class-variance-authority';
import { colorScheme } from '../../utilities/colorScheme.util';

export const barStyles = cva(
    ['flex flex-row border-2 border-solid min-h-60 w-full'],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                default: ['bg-[--color-100] border-[--color-200]'],
            },
        },
        compoundVariants: [],
        defaultVariants: { divergent: 'default', colorScheme: 'slate' },
    }
);

export type BarStyles = VariantProps<typeof barStyles>;
