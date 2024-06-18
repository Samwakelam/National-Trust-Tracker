import { VariantProps, cva } from 'cva';
import { colorScheme } from '../../utilities/colorScheme.util';
import { scrollbar } from '../../utilities/className.utils';

export type CarouselStyles = VariantProps<typeof containerStyles>;

export const useCarouselStyles = ({
    colorScheme,
    divergents,
    isFullWidth,
}: CarouselStyles) => {
    const container = (className?: string) =>
        containerStyles({ divergents, colorScheme, isFullWidth, className });
    const viewport = (className?: string) =>
        viewportStyles({ divergents, colorScheme, isFullWidth, className });
    const slide = (className?: string) =>
        slideStyles({ divergents, colorScheme, isFullWidth, className });

    return { container, viewport, slide };
};

const containerStyles = cva(
    [
        'relative flex flex-row items-center justify-center px-0 my-0',
        'mx-[-16px] w-[calc(100%+32px)]',
        'md:mx-[-32px] md:w-[calc(100%+64px)]',
        'lg:w-full lg:my-x',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergents: {},
            isFullWidth: {
                true: [],
                false: [],
            },
        },
        compoundVariants: [],
        defaultVariants: {},
    }
);

const viewportStyles = cva(
    [
        'm-0 w-full flex flex-row flex-nowrap items-stretch overflow-x-scroll snap-x snap-mandatory scroll-smooth',
        scrollbar,
        'pb-16 px-16 gap-16 scroll-px-16',
        'md:pb-32 md:px-32 md:gap-32 scroll-px-32',
        'lg-pb-0 lg:p-0 lg:gap-16 lg:scroll-px-0 lg:scrollbar-none',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergents: {},
            isFullWidth: {
                true: ['lg:w-full'],
                false: ['lg:w-4/5'],
            },
        },
        compoundVariants: [],
        defaultVariants: {},
    }
);

const slideStyles = cva(
    [
        'm-0 p-0 grow-0 shrink-0 min-w-16 flex flex-row justify-center items-center snap-start scroll-ms-0',
        'w-4/5',
        'md:w-9/10',
        'lg:w-full',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            divergents: {},
            isFullWidth: {
                true: [],
                false: [],
            },
        },
        compoundVariants: [],
        defaultVariants: {},
    }
);
