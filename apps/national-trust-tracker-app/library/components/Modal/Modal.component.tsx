'use client';

import React, { ReactElement } from 'react';

import { scrollbar } from '../../utilities/className.utils';

import { Button, ButtonProps } from '../Button';
import { ModalStyles, modalStyles } from './Modal.styles';
import { twMerge } from '../../utilities/twMerge.util';

// MARK: Types

type ModalPreset = 'confirm';

export interface ModalProps extends ModalComponentProps {
    preset?: ModalPreset;
}

interface ModalComponentProps extends ModalStyles {
    children?: ReactElement | ReactElement[];
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    heading?: string;
    isOpen: boolean;
    onClose: () => void;
}

type ModalOverlayProps = Pick<ModalProps, 'onClose' | 'isOpen'>;

// MARK: Presets

export const Modal = ({ preset, ...props }: ModalProps) => {
    const { confirmCTA, declineCTA, children } = props;

    switch (preset) {
        case 'confirm':
            return (
                <ModalComponent
                    {...props}
                    confirmCTA={{
                        children: 'Confirm',
                        colorScheme: 'green',
                        ...confirmCTA,
                    }}
                    declineCTA={{
                        children: 'Cancel',
                        colorScheme: 'red',
                        divergent: 'outline',
                        ...declineCTA,
                    }}
                >
                    <div className='flex flex-col items-center gap-16'>
                        <h3 className='text-32 font-bold uppercase'>
                            Are you sure?
                        </h3>
                        <p className='font-bold'>
                            This action is permanent and cannot be undone
                        </p>
                        {children}
                    </div>
                </ModalComponent>
            );
        default:
            return <ModalComponent {...props} />;
    }
};

// MARK: Modal Component

const ModalComponent = ({
    children,
    colorScheme,
    confirmCTA,
    declineCTA,
    divergent,
    heading,
    isOpen,
    onClose,
}: ModalComponentProps): ReactElement<ModalProps> => {
    const styles = modalStyles({
        colorScheme,
        divergent,
        className: twMerge(isOpen ? 'absolute' : 'hidden'),
    });

    // MARK: Return

    return (
        <>
            <article
                data-label='modal'
                className={twMerge(styles)}
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
                        divergent='ghost'
                        colorScheme={colorScheme}
                    />
                </header>
                <div
                    data-label='modal-body'
                    className={twMerge(
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
                            divergent='soft'
                            colorScheme={colorScheme}
                            onClick={onClose}
                            {...declineCTA}
                        />
                    )}
                    {confirmCTA && (
                        <Button
                            divergent='soft'
                            colorScheme={colorScheme}
                            {...confirmCTA}
                        />
                    )}
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
            className={twMerge(
                'flex top-0 right-0 bottom-0 left-0 bg-black/50 z-30',
                isOpen ? 'fixed' : 'hidden'
            )}
            onClick={onClose}
        />
    );
};
