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
        'flex flex-row flex-nowrap items-center gap-8 py-12 px-16 ',
        'bg-slate-50 hover:bg-slate-100 shadow-md shadow-color-slate-200',
        'first:rounded-t-8  last:rounded-b-8',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {},
            size: {},
        },
        compoundVariants: [],
        defaultVariants: {
            colorScheme: 'slate',
        },
    }
);

export type MenuItemStyles = VariantProps<typeof menuItemStyles>;
