import { type VariantProps, cva } from 'class-variance-authority';

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

    const bubble = (className?: string) =>
        bubbleStyles({
            divergent,
            className,
            colorScheme,
        });

    return { card, img, bubble };
};

//  MARK: Card Styles

export const cardStyles = cva(
    [
        'flex p-16 rounded-12 border border-solid border-transparent text-black-300',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            design: {},
            direction: {
                horizontal: ['flex-col sm:flex-row'],
                vertical: ['flex-col'],
            },
            divergent: {
                outline: ['bg-transparent border-[--color-400]'],
                solid: ['bg-[--color-200]'],
                solidOutline: ['bg-[--color-200] border-[--color-400]'],
                ghost: ['bg-transparent'],
            },
            size: {
                sm: [],
                md: [],
                lg: [],
            },
        },
        compoundVariants: [
            {
                colorScheme: 'black',
                divergent: ['solid', 'solidOutline'],
                className: 'text-white-300',
            },
        ],
        defaultVariants: {
            divergent: 'solid',
            size: 'md',
            colorScheme: 'slate',
            direction: 'vertical',
        },
    }
);

export type CardStyles = VariantProps<typeof cardStyles>;

//  MARK: Image Styles

const imageStyles = cva(
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

// MARK: Bubble Styles

const bubbleStyles = cva(
    [
        'py-4 px-16 rounded-16 w-fit row-start-1 row-span-2 col-start-1 mx-16 z-[2] text-black-300',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergent: {
                outline: ['bg-[--color-400]'],
                solid: ['bg-[--color-400]'],
                solidOutline: ['bg-[--color-400]'],
                ghost: ['bg-[--color-200]'],
            },
        },
        compoundVariants: [
            { colorScheme: 'black', className: 'text-white-300' },
        ],
        defaultVariants: {
            colorScheme: 'slate',
            divergent: 'solid',
        },
    }
);
