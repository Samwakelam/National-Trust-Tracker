import { VariantProps, cva } from 'class-variance-authority';
import { colorScheme } from '../../utilities/colorScheme.util';

// MARK: Types

export type DrawerStyles = VariantProps<typeof drawerStyles>;

// MARK: Drawer Styles
export const drawerStyles = cva(
    [
        'absolute bg-slate-50 shadow-lg flex flex-col z-40',
        'delay-75 duration-500 ease-in-out',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            direction: {
                left: ['transition-[left]'],
                right: ['transition-[right]'],
                top: ['transition-[top]'],
                bottom: ['transition-[bottom]'],
            },
            divergent: {
                closed: [],
                tab: ['h-4/5 top-1/10'],
            },
            isOpen: {
                true: [],
                false: [],
            },
            isVisible: {
                true: ['visible'],
                false: ['invisible'],
            },
            size: {
                sm: [],
                md: [],
                lg: [],
                xl: [],
            },
        },

        compoundVariants: [
            // MARK: Tab
            { divergent: 'tab', isVisible: false, className: 'visible' },
            {
                divergent: 'tab',
                direction: ['right', 'top'],
                isOpen: false,
                className: [
                    'right-[calc(-75%+56px)] transition-[right] left-[unset]',
                    'rounded-l-24 rounded-r-0 w-3/4',
                ],
            },
            {
                divergent: 'tab',
                direction: ['right', 'top'],
                isOpen: true,
                className: [
                    'right-0 transition-[right] left-[unset]',
                    'rounded-l-24 rounded-r-0 w-3/4',
                ],
            },
            {
                divergent: 'tab',
                direction: ['left', 'bottom'],
                isOpen: false,
                className: [
                    'left-[calc(-75%+56px)] transition-[left] right-[unset]',
                    'rounded-r-24 rounded-l-0 w-3/4',
                ],
            },
            {
                divergent: 'tab',
                direction: ['left', 'bottom'],
                isOpen: true,
                className: [
                    'left-0 transition-[left] right-[unset]',
                    'rounded-r-24 rounded-l-0 w-3/4',
                ],
            },
            // MARK: Closed
            {
                divergent: 'closed',
                isOpen: true,
                direction: 'left',
                className: 'left-0 rounded-r-24',
            },
            {
                divergent: 'closed',
                isOpen: true,
                direction: 'right',
                className: 'right-0 rounded-l-24',
            },
            {
                divergent: 'closed',
                isOpen: true,
                direction: 'top',
                className: 'top-0 rounded-b-24',
            },
            {
                divergent: 'closed',
                isOpen: true,
                direction: 'bottom',
                className: 'bottom-0 rounded-t-24',
            },
            {
                divergent: 'closed',
                isOpen: false,
                direction: 'left',
                className: 'left-[-75%] rounded-r-24',
            },
            {
                divergent: 'closed',
                isOpen: false,
                direction: 'right',
                className: 'right-[-75%] rounded-l-24',
            },
            {
                divergent: 'closed',
                isOpen: false,
                direction: 'top',
                className: 'top-[-75%] rounded-b-24',
            },
            {
                divergent: 'closed',
                isOpen: false,
                direction: 'bottom',
                className: 'bottom-[-75%] rounded-t-24',
            },
            {
                divergent: 'closed',
                direction: ['left', 'right'],
                size: 'sm',
                className: 'h-full w-9/10 sm:w-3/5 lg:w-1/3 top-0',
            },
            {
                divergent: 'closed',
                direction: ['top', 'bottom'],
                size: 'sm',
                className: 'h-9/10 sm:h-2/5 lg:h-1/3 w-full left-0',
            },
            {
                divergent: 'closed',
                direction: ['left', 'right'],
                size: 'md',
                className: 'h-full w-9/10 sm:w-7/10 lg:w-1/2 top-0',
            },
            {
                divergent: 'closed',
                direction: ['top', 'bottom'],
                size: 'md',
                className: 'h-9/10 sm:h-3/5 lg:h-1/2 w-full left-0',
            },
            {
                divergent: 'closed',
                direction: ['left', 'right'],
                size: 'lg',
                className: 'h-full w-9/10 lg:w-2/3 top-0',
            },
            {
                divergent: 'closed',
                direction: ['top', 'bottom'],
                size: 'lg',
                className: 'h-9/10 sm:h-4/5 lg:h-2/3 w-full left-0',
            },
            {
                divergent: 'closed',
                direction: ['left', 'right'],
                size: 'xl',
                className: 'h-full w-9/10 lg:w-4/5 top-0',
            },
            {
                divergent: 'closed',
                direction: ['top', 'bottom'],
                size: 'xl',
                className: 'h-9/10 lg:h-4/5 w-full left-0',
            },
        ],
        defaultVariants: {
            divergent: 'closed',
            size: 'lg',
            direction: 'right',
        },
    }
);
