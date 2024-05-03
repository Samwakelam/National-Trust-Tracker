import { VariantProps, cva } from 'cva';

import { colorScheme } from '../../utilities/colorScheme.util';

export const toastStyles = cva(
    [
        'grid grid-cols-[20px_1fr_20px] p-16 gap-8 rounded-20 items-center',
        'absolute top-0 transition-all duration-700 ease-out opacity-0 -translate-y-full w-max',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                soft: ['bg-[--color-200]'],
                solid: ['bg-[--color-400]'],
                outline: [
                    'bg-[--color-200] border border-solid border-[--color-400]',
                ],
                accent: [
                    'bg-[--color-200] border-l-[20px] border-solid border-[--color-400]',
                ],
            },
        },
        compoundVariants: [],
        defaultVariants: {
            divergent: 'soft',
            colorScheme: 'slate',
        },
    }
);

export type ToastStyles = VariantProps<typeof toastStyles>;
