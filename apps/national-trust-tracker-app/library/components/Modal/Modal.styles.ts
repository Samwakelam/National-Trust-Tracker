import { VariantProps, cva } from 'cva';
import { colorScheme } from '../../utilities/colorScheme.util';

export const modalStyles = cva(
    [
        'max-h-4/5 w-3/4 right-2/25 bg-slate-50 left-2/25 top-1/10 flex flex-col rounded-24 z-40 shadow-lg',
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

export type ModalStyles = VariantProps<typeof modalStyles>;
