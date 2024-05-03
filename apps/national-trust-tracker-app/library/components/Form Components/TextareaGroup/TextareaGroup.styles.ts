import { VariantProps, cva } from 'cva';
import { colorScheme } from '../../../utilities/colorScheme.util';

export const textareaStyles = cva(
    [
        'bg-white-100 px-16 py-8 placeholder:text-slate-400 z-[1]',
        'first:rounded-l-8 last:rounded-r-8 border-solid border',
        'focus:outline-none focus:shadow-focus',
        'focus-visible:outline-none focus-visible:shadow-focus',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                default: [
                    'border-[--color-200]',
                    'disabled:bg-transparent disabled:border-[--color-400]',
                    'focus:shadow-[--color-200] focus-visible:shadow-[--color-200]',
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

export type TextareaStyles = VariantProps<typeof textareaStyles>;
