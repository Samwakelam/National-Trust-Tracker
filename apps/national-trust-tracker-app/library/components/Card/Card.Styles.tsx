import { VariantProps, cva } from 'cva';

import { colorScheme } from '../../utilities/colorScheme.util';

// MARK: useCardStyles

export const useCardStyles = ({
    design,
    direction,
    divergent,
    size,
    colorScheme,
}: CardStyles) => {
    const card = (className?: string) =>
        cardStyles({
            design,
            direction,
            divergent,
            size,
            colorScheme,
            className,
        });

    const img = (className?: string) =>
        imageStyles({
            direction,
            className: className,
        });

    return { card, img };
};

//  MARK: cardStyles

export const cardStyles = cva(
    ['flex p-16 rounded-12 border border-solid border-transparent'],
    {
        variants: {
            colorScheme: colorScheme,
            design: {},
            direction: {
                horizontal: ['flex-col sm:flex-row'],
                vertical: ['flex-col'],
            },
            divergent: {
                ghost: ['bg-transparent'],
                outline: ['bg-transparent border-[--color-400]'],
                soft: ['bg-[--color-200]'],
                solid: ['bg-[--color-300]'],
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
            direction: 'vertical',
        },
    }
);

export type CardStyles = VariantProps<typeof cardStyles>;

//  MARK: imageStyles

export const imageStyles = cva(
    [
        'flex flex-1 w-full h-full pb-16',
        '[&>img]:rounded-t-6 [&>img]:rounded-b-0',
    ],
    {
        variants: {
            direction: {
                horizontal: [
                    'sm:pb-0 sm:pr-16',
                    'sm:[&>img]:rounded-l-6 sm:[&>img]:rounded-r-0',
                ],
                vertical: [],
            },
        },
        defaultVariants: {
            direction: 'vertical',
        },
    }
);
