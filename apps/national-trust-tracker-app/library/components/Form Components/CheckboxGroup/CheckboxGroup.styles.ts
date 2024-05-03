import { VariantProps, cva } from 'cva';
import { colorScheme } from '../../../utilities/colorScheme.util';

export const checkboxStyles = cva(
    [
        'appearance-none relative',
        'bg-white-100 h-16 w-16 z-[1]',
        'rounded-4 border-solid border',
        'focus:outline-none focus:shadow-focus',
        'focus-visible:outline-none focus-visible:shadow-focus',
        'checked:after:content-["✓"] checked:after:text-white-200 checked:after:absolute checked:after:top-0 checked:after:bottom-0 checked:after:right-0 checked:after:left-0 checked:after:flex checked:after:justify-center checked:after:items-center checked:after:text-10 checked:after:font-bold',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                default: [
                    'border-[--color-200]',
                    'disabled:bg-transparent disabled:border-[--color-400]',
                    'disabled:checked:after:text-[--color-400]',
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

export type CheckboxStyles = VariantProps<typeof checkboxStyles>;
