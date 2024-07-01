'use client';

import React, { ReactElement, useEffect, useState } from 'react';

import { scrollbar } from '../../utilities/className.utils';
import { twMerge } from '../../utilities/twMerge.util';

import { Button, ButtonProps } from '../Button';
import { IconProps } from '../Icon';

import { DrawerStyles, drawerStyles } from './Drawer.styles';

// MARK: Types

type Drawer = {
    children?: ReactElement | ReactElement[];
    className?: string;
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    heading?: string;
    isOpen: boolean;
    onClose: () => void;
};

interface ClosedDrawer
    extends Omit<DrawerStyles, 'isOpen' | 'isVisible'>,
        Drawer {
    divergent: 'closed';
}

interface TabDrawer extends Omit<DrawerStyles, 'isOpen' | 'isVisible'>, Drawer {
    divergent: 'tab';
    onOpen: () => void;
}

export type DrawerProps = TabDrawer | ClosedDrawer;

type DrawerOverlayProps = Pick<DrawerProps, 'onClose' | 'isOpen'>;

// MARK: Drawer

export const Drawer = ({
    children,
    className,
    colorScheme,
    confirmCTA,
    declineCTA,
    direction,
    divergent,
    heading,
    isOpen,
    onClose,
    size,
    ...props
}: DrawerProps): ReactElement<DrawerProps> => {
    let onOpen;
    if ('onOpen' in props && divergent === 'tab') {
        onOpen = props.onOpen;
    }

    const isVisible = useDrawerVisibility(isOpen);

    const styles = drawerStyles({
        className,
        direction,
        divergent,
        isOpen,
        isVisible,
        size,
    });

    useEffect(() => {}, [isOpen]);

    // MARK: Return

    return (
        <>
            <aside
                data-label='drawer'
                className={twMerge(styles)}
                aria-hidden={isVisible}
            >
                <header
                    data-label='drawer-header'
                    className='grid grid-cols-[theme(spacing.40)_1fr_theme(spacing.40)] grid-rows-1  p-8'
                >
                    {/* MARK: Header
                     */}
                    {heading && (
                        <h2
                            data-label='drawer-title'
                            className='font-bold col-start-2 col-span-1 text-center my-auto'
                        >
                            {heading}
                        </h2>
                    )}
                    {!onOpen && (
                        <Button
                            icon={{ icon: 'cross', ariaLabel: 'cancel' }}
                            onClick={onClose}
                            divergent='ghost'
                            className={twMerge(
                                'col-span-1 row-start-1',
                                direction === 'left'
                                    ? 'col-start-3'
                                    : 'col-start-1'
                            )}
                        />
                    )}
                    {onOpen && !isOpen && (
                        <Button
                            icon={resolveOpenIcon(direction)}
                            onClick={onOpen}
                            className={twMerge(
                                'col-span-1 row-start-1',
                                direction === 'left' || direction === 'bottom'
                                    ? 'col-start-3'
                                    : 'col-start-1'
                            )}
                        />
                    )}
                    {onOpen && isOpen && (
                        <Button
                            icon={resolveCloseIcon(direction)}
                            onClick={onClose}
                            className={twMerge(
                                'col-span-1 row-start-1',
                                direction === 'left' || direction === 'bottom'
                                    ? 'col-start-3'
                                    : 'col-start-1'
                            )}
                        />
                    )}
                </header>
                {/* MARK: Body
                 */}
                <div
                    data-label='drawer-body'
                    className={twMerge(
                        'flex flex-col gap-16 flex-1 p-16 pt-0 mb-16 items-center overflow-y-auto overflow-x-hidden',
                        scrollbar
                    )}
                >
                    {children}
                </div>
                {/* MARK: Footer
                 */}
                <footer
                    data-label='drawer-footer'
                    className='flex flex-row gap-16 justify-end p-16'
                >
                    {declineCTA && (
                        <Button
                            onClick={onClose}
                            colorScheme={colorScheme}
                            divergent='soft'
                            {...declineCTA}
                        >
                            Cancel
                        </Button>
                    )}
                    {confirmCTA && (
                        <Button
                            colorScheme={colorScheme}
                            divergent='soft'
                            {...confirmCTA}
                        >
                            Confirm
                        </Button>
                    )}
                </footer>
            </aside>
            {/* MARK: Overlay
             */}
            <DrawerOverlay
                onClose={onClose}
                isOpen={isOpen}
            />
        </>
    );
};

// MARK: Drawer Overlay

const DrawerOverlay = ({ onClose, isOpen }: DrawerOverlayProps) => {
    const isVisible = useDrawerVisibility(isOpen);

    return (
        <div
            data-label='drawer-overlay'
            className={twMerge(
                'flex absolute top-0 right-0 bottom-0 left-0 bg-black/50 z-30',
                isOpen ? 'bg-black-500/50' : 'bg-black-500/0',
                isVisible ? 'visible' : 'invisible',
                'transition-[background-color] ease-in-out duration-500'
            )}
            onClick={onClose}
            aria-hidden={isVisible}
        />
    );
};

// MARK: Use Drawer Visibility

const useDrawerVisibility = (isOpen: boolean) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen === true) setIsVisible(true);
        if (isOpen === false)
            setTimeout(() => {
                setIsVisible(false);
            }, 600);
    }, [isOpen]);

    return isVisible;
};

// MARK: Resolve Functions

const resolveCloseIcon = (direction: DrawerProps['direction']): IconProps => {
    switch (direction) {
        case 'bottom':
        case 'left':
            return { icon: 'panel-cl', ariaLabel: 'close panel' };

        default:
            return { icon: 'panel-cr', ariaLabel: 'close panel' };
    }
};

const resolveOpenIcon = (direction: DrawerProps['direction']): IconProps => {
    switch (direction) {
        case 'bottom':
        case 'left':
            return { icon: 'panel-ol', ariaLabel: 'open panel' };
        default:
            return { icon: 'panel-or', ariaLabel: 'open panel' };
    }
};
