import { VariantProps, cva } from 'class-variance-authority';
import { colorScheme } from '../../utilities/colorScheme.util';

export const spinnerStyles = cva(['animate-spin'], {
    variants: {
        colorScheme: colorScheme,
        size: {
            sm: ['w-20 h-20 text-[--color-500]'],
            md: ['w-32 h-32 text-[--color-500]'],
            lg: ['w-44 h-44 text-[--color-500]'],
            xl: ['w-56 h-56 text-[--color-500]'],
        },
    },
    defaultVariants: {
        size: 'sm',
        colorScheme: 'slate',
    },
});

export type SpinnerStyle = VariantProps<typeof spinnerStyles>;
