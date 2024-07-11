import { VariantProps, cva } from 'class-variance-authority';
import { colorScheme } from '../../../utilities/colorScheme.util';

export const inputStyles = cva(
    [
        'bg-white-100 px-16 py-8 placeholder:text-slate-400 z-[1] w-full text-black-300',
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

export type InputStyles = VariantProps<typeof inputStyles>;

export const elementStyles = cva(
    [
        'w-fit bg-white-100 border border-solid  flex flex-row items-center justify-center z-[2]',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                default: ['border-[--color-200]'],
            },
            placement: {
                left: [' first:rounded-l-8 border-r-0 pl-6'],
                right: [' last:rounded-r-8 border-l-0 pr-6'],
            },
            hasFocus: {
                true: ['shadow-[--color-200]'],
                false: [],
            },
            hasError: {
                true: ['border-b-red-400'],
                false: [],
            },
            disabled: {
                true: ['bg-transparent border-[--color-400]'],
                false: [''],
            },
        },
        compoundVariants: [
            {
                placement: 'left',
                hasFocus: true,
                className:
                    'shadow-[-2px_2px_0_2px_var(--tw-shadow-color),-2px_-2px_0_2px_var(--tw-shadow-color)]',
            },
            {
                placement: 'right',
                hasFocus: true,
                className:
                    'shadow-[2px_2px_0_2px_var(--tw-shadow-color),2px_-2px_0_2px_var(--tw-shadow-color)]',
            },
        ],
        defaultVariants: {
            colorScheme: 'slate',
            divergent: 'default',
            disabled: false,
        },
    }
);

export type ElementStyles = VariantProps<typeof elementStyles>;

export const addonStyles = cva(
    ['bg-white-300 px-16 py-8 border border-solid'],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                default: ['border-[--color-200]'],
            },
            placement: {
                left: ['first:rounded-l-8 border-r-0'],
                right: ['border-l-0 last:rounded-r-8'],
            },
            disabled: {
                true: ['bg-transparent border-[--color-400]'],
                false: [''],
            },
        },
        compoundVariants: [],
        defaultVariants: {
            colorScheme: 'slate',
            divergent: 'default',
            disabled: false,
        },
    }
);

export type AddonStyles = VariantProps<typeof addonStyles>;
