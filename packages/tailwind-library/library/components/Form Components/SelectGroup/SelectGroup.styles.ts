import { VariantProps, cva } from 'class-variance-authority';
import { colorScheme } from '../../../utilities/colorScheme.util';

export const selectStyles = cva(
    [
        'bg-white-100 py-8 pl-16 pr-56 placeholder:text-slate-400 z-[1] w-full mr-[-42px] text-black-300',
        'rounded-8 border-solid border',
        'focus:outline-none focus:shadow-focus',
        'focus-visible:outline-none focus-visible:shadow-focus',
        'appearance-none',
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

export type SelectStyles = VariantProps<typeof selectStyles>;
