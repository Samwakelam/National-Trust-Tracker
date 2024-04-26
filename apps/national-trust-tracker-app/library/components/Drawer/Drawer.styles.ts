import { VariantProps, cva } from 'cva';
import { colorScheme } from '../../utilities/colorScheme.util';

// MARK: Types

export type DrawerStyles = VariantProps<typeof drawerStyles>;

// MARK: Drawer Styles
export const drawerStyles = cva(
    [
        'absolute bg-slate-50 shadow-lg flex flex-col z-40 ',
        'delay-75 duration-500 ease-in-out',
    ],
    {
        variants: {
            colorScheme: colorScheme,
            direction: {
                left: [
                    'transition-[left] left-[-75%] top-0',
                    'h-full w-3/4',
                    'rounded-r-24',
                ],
                right: [
                    'transition-[right] right-[-75%] top-0',
                    'h-full w-3/4',
                    'rounded-l-24',
                ],
                top: [
                    'transition-[top] top-[-75%]  left-0',
                    ' h-3/4 w-full',
                    'rounded-b-24',
                ],
                bottom: [
                    'transition-[bottom] bottom-[-75%] left-0',
                    ' h-3/4 w-full',
                    'rounded-t-24',
                ],
            },
            divergent: {
                closed: [],
                tab: ['h-4/5 top-1/10'],
            },
            isOpen: {
                true: ['right-0'],
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
            },
        },
        compoundVariants: [
            {
                divergent: 'tab',
                direction: ['right', 'top'],
                isOpen: false,
                isVisible: false,
                className: [
                    'right-[calc(-75%+56px)] visible',
                    'w-3/4 left-[unset]',
                    'rounded-l-24 rounded-r-0',
                ],
            },
            {
                divergent: 'tab',
                direction: ['right', 'top'],
                isOpen: true,
                className: [
                    'right-0',
                    'w-3/4 left-[unset]',
                    'rounded-l-24 rounded-r-0',
                ],
            },
            {
                divergent: 'tab',
                direction: ['left', 'bottom'],
                isOpen: false,
                isVisible: false,
                className: [
                    'left-[calc(-75%+56px)] visible',
                    'w-3/4 right-[unset]',
                    'rounded-r-24 rounded-l-0',
                ],
            },
            {
                divergent: 'tab',
                direction: ['left', 'bottom'],
                isOpen: true,
                className:
                    'left-0 visible w-3/4 right-[unset] rounded-r-24 rounded-l-0',
            },
            {
                divergent: 'closed',
                isOpen: true,
                direction: 'left',
                className: 'left-0',
            },
            {
                divergent: 'closed',
                isOpen: true,
                direction: 'top',
                className: 'top-0',
            },
            {
                divergent: 'closed',
                isOpen: true,
                direction: 'bottom',
                className: 'bottom-0',
            },
        ],
        defaultVariants: {
            divergent: 'closed',
            size: 'lg',
            direction: 'right',
        },
    }
);
