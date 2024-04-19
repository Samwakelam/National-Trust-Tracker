'use client';

import React, { ReactElement } from 'react';

import { Button, ButtonProps } from '../Button';
import clsx from 'clsx';
import { scrollbar } from '../../utilities/className.utils';

export type ModalProps = {
    children?: ReactElement | ReactElement[];
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    heading?: string;
    isOpen: boolean;
    onClose: () => void;
};

type ModalOverlayProps = Pick<ModalProps, 'onClose' | 'isOpen'>;

export const Modal = ({
    children,
    confirmCTA,
    declineCTA,
    heading,
    isOpen,
    onClose,
}: ModalProps): ReactElement<ModalProps> => {
    return (
        <>
            <article
                data-label='modal'
                className={clsx(
                    'max-h-4/5 w-3/4 bg-pink-100 right-2/25 left-2/25 top-1/10 flex flex-col rounded-24 z-40 ',
                    isOpen ? 'absolute' : 'hidden'
                )}
            >
                <header
                    data-label='modal-header'
                    className='grid grid-cols-[theme(spacing.40)_1fr_theme(spacing.40)] grid-rows-1  p-8'
                >
                    {heading && (
                        <h3
                            data-label='modal-title'
                            className='font-bold col-start-2 col-span-1 text-center my-auto'
                        >
                            {heading}
                        </h3>
                    )}
                    <Button
                        icon={{ icon: 'cross', ariaLabel: 'cancel' }}
                        onClick={onClose}
                        className='col-start-3 col-span-1'
                    />
                </header>
                <div
                    data-label='modal-body'
                    className={clsx(
                        'flex flex-col gap-16 flex-1 p-16 pt-0 mb-16 items-center overflow-y-auto overflow-x-hidden',
                        scrollbar
                    )}
                >
                    {children}
                </div>
                <footer
                    data-label='modal-footer'
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
            </article>
            <ModalOverlay
                onClose={onClose}
                isOpen={isOpen}
            />
        </>
    );
};

// data-label='' className=''

const ModalOverlay = ({ onClose, isOpen }: ModalOverlayProps) => {
    return (
        <div
            data-label='modal-overlay'
            className={clsx(
                'flex top-0 right-0 bottom-0 left-0 bg-black/50 z-30',
                isOpen ? 'fixed' : 'hidden'
            )}
            onClick={onClose}
        />
    );
};