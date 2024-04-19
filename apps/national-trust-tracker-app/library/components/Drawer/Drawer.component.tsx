'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import clsx from 'clsx';

import { scrollbar } from '../../utilities/className.utils';

import { Button, ButtonProps } from '../Button';

export type DrawerProps = {
    children?: ReactElement | ReactElement[];
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    heading?: string;
    isOpen: boolean;
    onClose: () => void;
};

type DrawerOverlayProps = Pick<DrawerProps, 'onClose' | 'isOpen'>;

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

export const Drawer = ({
    children,
    confirmCTA,
    declineCTA,
    heading,
    isOpen,
    onClose,
}: DrawerProps): ReactElement<DrawerProps> => {
    const isVisible = useDrawerVisibility(isOpen);

    return (
        <>
            <aside
                data-label='drawer'
                className={clsx(
                    'h-full absolute w-3/4 bg-pink-100 top-0 flex flex-col rounded-l-24 z-40 ',
                    isVisible ? 'visible' : 'invisible',
                    isOpen ? 'right-0' : 'right-[-75%]',
                    'transition-[right] delay-75 duration-500 ease-in-out '
                )}
                aria-hidden={isVisible}
            >
                <header
                    data-label='drawer-header'
                    className='grid grid-cols-[theme(spacing.40)_1fr_theme(spacing.40)] grid-rows-1  p-8'
                >
                    {heading && (
                        <h3
                            data-label='drawer-title'
                            className='font-bold col-start-2 col-span-1 text-center my-auto'
                        >
                            {heading}
                        </h3>
                    )}
                    <Button
                        icon={{ icon: 'cross', ariaLabel: 'cancel' }}
                        onClick={onClose}
                        className='col-start-1 col-span-1 row-start-1'
                    />
                </header>
                <div
                    data-label='drawer-body'
                    className={clsx(
                        'flex flex-col gap-16 flex-1 p-16 pt-0 mb-16 items-center overflow-y-auto overflow-x-hidden',
                        scrollbar
                    )}
                >
                    {children}
                </div>
                <footer
                    data-label='drawer-footer'
                    className='flex flex-row gap-16 justify-end p-16'
                >
                    {declineCTA && (
                        <Button
                            onClick={onClose}
                            {...declineCTA}
                        >
                            Cancel
                        </Button>
                    )}
                    {confirmCTA && <Button {...confirmCTA}>Confirm</Button>}
                </footer>
            </aside>
            <DrawerOverlay
                onClose={onClose}
                isOpen={isOpen}
            />
        </>
    );
};

// data-label='' className=''

const DrawerOverlay = ({ onClose, isOpen }: DrawerOverlayProps) => {
    const isVisible = useDrawerVisibility(isOpen);

    return (
        <div
            data-label='drawer-overlay'
            className={clsx(
                'flex absolute top-0 right-0 bottom-0 left-0 bg-black/50 z-30',
                isOpen ? 'bg-black/50' : 'bg-black/0',
                isVisible ? 'visible' : 'invisible',
                'transition-[background-color] ease-in-out duration-500'
            )}
            onClick={onClose}
            aria-hidden={isVisible}
        />
    );
};
