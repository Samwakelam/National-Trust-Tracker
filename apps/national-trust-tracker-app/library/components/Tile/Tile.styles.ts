import { VariantProps, cva } from 'cva';

import { colorScheme } from '../../utilities/colorScheme.util';

//  MARK: Tile Styles

export const tileStyles = cva(
    [
        'flex rounded-12 flex-col aspect-3/4 w-fit justify-center border border-solid border-transparent',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            design: {},
            divergent: {
                outline: ['bg-transparent border-[--color-400]'],
                solid: ['bg-[--color-200]'],
                solidOutline: ['bg-[--color-200] border-[--color-400]'],
            },
            size: {
                sm: [],
                md: [],
                lg: [],
            },
        },
        defaultVariants: {
            divergent: 'solid',
            size: 'md',
            colorScheme: 'slate',
        },
    }
);

export type TileStyles = VariantProps<typeof tileStyles>;
