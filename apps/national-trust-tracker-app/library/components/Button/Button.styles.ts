import { VariantProps, cva } from 'cva';

import { colorScheme } from '../../utilities/colorScheme.util';

export type ButtonStyles = VariantProps<typeof buttonStyles>;

// MARK: Use Button Styles

export const useButtonStyles = ({
    design,
    divergent,
    size,
    colorScheme,
    iconButton,
    isLoading,
}: ButtonStyles) => {
    const button = (className?: string) =>
        buttonStyles({
            design,
            divergent,
            size,
            colorScheme,
            iconButton,
            isLoading,
            className,
        });

    const icon = (className?: string) =>
        iconStyles({
            size,
            className,
        });

    return { button, icon };
};

// MARK: Button Styles

const buttonStyles = cva(
    [
        'grid grid-rows-1 grid-cols-1 justify-center items-center py-0 capitalize font-semibold rounded-[24px] border border-solid border-transparent',
        'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed',
        'focus-visible:shadow-focus focus-visible:shadow-[--color-300] focus-visible:outline-none',
        `focus:shadow-focus focus:shadow-[--color-300] focus:outline-none`,
    ],
    {
        variants: {
            colorScheme: colorScheme,
            design: {},
            divergent: {
                ghost: [
                    `bg-transparent`,
                    `hover:bg-[--color-200]`,
                    `active:bg-[--color-200]`,
                    `data-[active=true]:bg-[--color-200]`,
                    `text-[--color-500]`,
                ],
                outline: [
                    `bg-transparent text-[--color-700] border-[--color-500]`,
                    'disabled:border-slate-300 disabled:bg-transparent',
                    `hover:bg-[--color-200]`,
                    `active:bg-[--color-200]`,
                    `data-[active=true]:bg-[--color-200]`,
                ],
                soft: [
                    `bg-[--color-200] text-[--color-700]`,
                    `hover:bg-[--color-300]`,
                    `active:bg-[--color-300] active:focus:shadow-[--color-400] active:focus-visible:shadow-[--color-400]`,
                    `data-[active=true]:bg-[--color-300] data-[active=true]:focus:shadow-[--color-400] data-[active=true]:focus-visible:shadow-[--color-400]`,
                ],
                solid: [
                    `bg-[--color-400] text-slate-800`,
                    `hover:bg-[--color-300]`,
                    `active:bg-[--color-300] active:focus:shadow-[--color-200] active:focus-visible:shadow-[--color-200]`,
                    `data-[active=true]:bg-[--color-300] data-[active=true]:focus:shadow-[--color-200] data-[active=true]:focus-visible:shadow-[--color-200]`,
                ],
            },
            iconButton: {
                true: ['w-40 min-w-40 px-0'],
                false: [],
            },
            isLoading: {
                true: ['pointer-events-none cursor-wait'],
                false: [],
            },
            size: {
                sm: `h-32 text-14 px-16`,
                md: `h-40 text-16 px-24`,
            },
        },
        compoundVariants: [
            {
                divergent: ['solid', 'outline', 'soft', 'ghost'],
                colorScheme: 'white',
                className: 'text-slate-800',
            },
            {
                divergent: ['outline'],
                colorScheme: 'white',
                className: 'border-[--color-50]',
            },
            {
                divergent: ['outline', 'ghost'],
                colorScheme: 'black',
                className:
                    'text-slate-800 hover:text-slate-100 active:text-slate-100 data-[active=true]:text-slate-100',
            },
            {
                divergent: ['soft', 'solid'],
                colorScheme: 'black',
                className: 'text-slate-100',
            },
            {
                divergent: ['outline'],
                colorScheme: 'black',
                className: 'border-[--color-800]',
            },
            {
                size: 'sm',
                iconButton: true,
                className: 'w-32 px-0',
            },
            {
                size: 'md',
                iconButton: true,
                className: 'w-40 px-0',
            },
        ],
        defaultVariants: {
            divergent: 'solid',
            size: 'md',
            colorScheme: 'slate',
        },
    }
);

// MARK: Icon Styles

const iconStyles = cva([], {
    variants: {
        colorScheme: colorScheme,
        size: {
            sm: ['w-14 h-14'],
            md: ['w-16 h-16'],
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
