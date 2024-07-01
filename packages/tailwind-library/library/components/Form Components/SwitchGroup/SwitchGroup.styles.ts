import { VariantProps, cva } from 'class-variance-authority';

import { colorScheme } from '../../../utilities/colorScheme.util';
import { accentColor } from '../../../utilities/accentColor.util';

export const switchStyles = cva(
    [
        'appearance-none h-24 w-48 rounded-full flex items-center border border-solid relative transition-all',
        'delay-75 duration-300 ease-in-out transition-all',

        'after:h-16 after:w-16 after:rounded-full after:block after:absolute after:top-[3px] after:bottom-[3px] after:left-[3px] after:transition-[left]',
        'after:delay-75 after:duration-300 after:ease-in-out after:transition-all',
        ' after:checked:left-[26px]',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            accentColor: accentColor,
            divergent: {
                single: [
                    'bg-white-100 border-[--color-200]',
                    'disabled:bg-transparent disabled:border-[--color-400]',
                    'checked:bg-[--color-400]',

                    'after:bg-[--color-200]',
                    'after:disabled:bg-transparent after:disabled:border after:disabled:border-solid after:disabled:border-[--color-400]',
                    'after:checked:bg-white-100',
                    'after:disabled:checked:bg-[--color-200]',
                ],
                dual: [
                    'bg-[--color-200] border-[--color-400]',
                    'disabled:bg-transparent disabled:border-[--color-400]',
                    'checked:bg-[--accent-200] checked:border-[--accent-400]',
                    'checked:disabled:border-[--accent-400]',

                    'after:bg-white-100',
                    'after:disabled:bg-transparent after:disabled:border after:disabled:border-solid after:disabled:border-[--color-400]',
                    'after:checked:disabled:border-[--accent-400] after:checked:disabled:bg-[--accent-200]',
                ],
            },
        },
        compoundVariants: [],
        defaultVariants: { divergent: 'single', colorScheme: 'slate' },
    }
);

export type SwitchStyles = VariantProps<typeof switchStyles>;
