import { VariantProps, cva } from 'cva';

import { colorScheme } from '../../utilities/colorScheme.util';

export const useFrameStyles = ({
    colorScheme,
    divergent,
    hero,
    size,
}: FrameStyles) => {
    const frame = (className?: string) =>
        frameStyles({
            colorScheme,
            divergent,
            hero,
            size,
            className,
        });

    const content = (className?: string) =>
        contentStyles({
            divergent,
            size,
            className,
        });

    return { content, frame };
};

//  MARK: Frame Styles

const frameStyles = cva(['w-full relative', 'px-16 md:px-32 lg:px-56'], {
    variants: {
        colorScheme: {
            transparent: ['[--color-200:transparent]'],
            ...colorScheme,
        },
        divergent: {
            section: ['py-56 lg:py-60 bg-[--color-200]'],
            banner: ['py-16'],
        },
        hero: {
            true: ['text-slate-100 bg-no-repeat bg-cover'],
            false: [],
        },
        size: {
            sm: [],
            md: [],
            lg: [],
        },
    },
    compoundVariants: [
        {
            divergent: ['banner', 'section'],
            colorScheme: 'black',
            className: 'text-slate-100',
        },
    ],
    defaultVariants: {
        divergent: 'section',
        size: 'md',
        colorScheme: 'transparent',
    },
});

export type FrameStyles = VariantProps<typeof frameStyles>;

//  MARK: Content Styles

const contentStyles = cva(
    [
        'relative flex flex-col w-full gap-16 md:gap-32 lg:gap-56 pt-56 lg:pt-60 mt-[-56px] lg:mt-[-60px] items-center z-10 mx-auto pb-0',
    ],
    {
        variants: {
            divergent: {
                section: ['pt-56 lg:pt-60'],
                banner: ['pt-16 mt-[-16px] gap-16'],
            },
            size: {
                sm: [],
                md: [],
                lg: [],
            },
        },
        defaultVariants: {
            divergent: 'section',
            size: 'md',
        },
    }
);
