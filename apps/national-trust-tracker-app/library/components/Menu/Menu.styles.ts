import { VariantProps, cva } from 'class-variance-authority';
import { colorScheme } from '../../utilities/colorScheme.util';

export const menuStyles = cva([], {
    variants: {
        colorScheme: colorScheme,
        divergent: {},
        size: {},
    },
    compoundVariants: [],
    defaultVariants: {
        colorScheme: 'slate',
    },
});

export type MenuStyles = VariantProps<typeof menuStyles>;

export const menuItemStyles = cva(
    [
        'grid grid-rows-1 grid-cols-1 justify-center items-center gap-8 py-12 px-16 ',
        'bg-slate-50 shadow-md shadow-color-slate-200',
        'first:rounded-t-8  last:rounded-b-8',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {},
            size: {},
            disabled: {
                true: ['text-slate-400 bg-slate-100'],
                false: ['hover:bg-slate-100 hover:cursor-pointer'],
            },
        },
        compoundVariants: [],
        defaultVariants: {
            colorScheme: 'slate',
            disabled: false,
        },
    }
);

export type MenuItemStyles = VariantProps<typeof menuItemStyles>;
