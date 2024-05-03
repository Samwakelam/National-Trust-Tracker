import { VariantProps, cva } from 'cva';
import { colorScheme } from '../../../utilities/colorScheme.util';

export const radioStyles = cva(
    [
        'appearance-none relative',
        'bg-white-100 h-16 w-16 z-[1]',
        'rounded-full border-solid border',
        'focus:outline-none focus:shadow-focus',
        'focus-visible:outline-none focus-visible:shadow-focus',
        'checked:after:absolute checked:after:top-4 checked:after:bottom-4 checked:after:right-4 checked:after:left-4 checked:after:rounded-full checked:after:bg-white-100',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                default: [
                    'border-[--color-200]',
                    'disabled:bg-transparent disabled:border-[--color-400]',
                    'disabled:checked:after:bg-[--color-400]',
                    'focus:shadow-[--color-200] focus-visible:shadow-[--color-200]',
                    'checked:bg-[--color-400]',
                ],
            },
        },
        compoundVariants: [],
        defaultVariants: {
            divergent: 'default',
            colorScheme: 'slate',
        },
    }
);

export type RadioStyles = VariantProps<typeof radioStyles>;
