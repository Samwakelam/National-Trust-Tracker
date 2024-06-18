import React, { ReactElement } from 'react';

import { Button, ButtonProps } from '..';

import * as Chakra from '@chakra-ui/react';

export type ModalProps = {
    children: ReactElement | ReactElement[];
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: Omit<Chakra.ModalProps['size'], 'full'>;
};

export const Modal = ({
    children,
    declineCTA,
    confirmCTA,
    isOpen,
    onClose,
    size,
    title,
}: ModalProps): ReactElement<ModalProps> => {
    const isSize2xl = size === '2xl';

    const motionPreset: Chakra.ModalProps['motionPreset'] =
        Chakra.useBreakpointValue({
            'base': 'slideInBottom',
            'sm': isSize2xl ? 'slideInBottom' : 'none',
            'md': 'none',
            'lg': 'none',
            'xl': 'none',
            '2xl': 'none',
        });

    const sx = {
        '--max-height-sm': isSize2xl ? '90vh' : 'calc(100vh - 8rem)',
        '--margin-bottom-sm': isSize2xl ? 0 : '4rem',
        '--position-sm': isSize2xl ? 'fixed' : 'relative',
        '--position-bottom-sm': isSize2xl ? 0 : 'unset',
        '--border-bottom-radius-sm': isSize2xl ? 0 : '0.375rem',
    };

    return (
        <Chakra.Modal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            data-label='modal'
            motionPreset={motionPreset || 'none'}
        >
            <Chakra.ModalOverlay />
            <Chakra.ModalContent
                //@ts-ignore - unknown error on sx
                sx={sx}
                data-label='modal-content'
            >
                <Chakra.ModalHeader data-label='header'>
                    <Chakra.Heading as='h4'>{title && title}</Chakra.Heading>
                    <Chakra.ModalCloseButton />
                </Chakra.ModalHeader>
                <Chakra.ModalBody data-label='body'>
                    {children}
                </Chakra.ModalBody>
                <Chakra.ModalFooter>
                    {(declineCTA || confirmCTA) && (
                        <>
                            {declineCTA && (
                                <Button
                                    variant='outline'
                                    children='Cancel'
                                    onClick={() => onClose()}
                                    {...declineCTA}
                                />
                            )}
                            {confirmCTA && (
                                <Button
                                    variant='solid'
                                    colorScheme='facebook'
                                    {...confirmCTA}
                                />
                            )}
                        </>
                    )}
                </Chakra.ModalFooter>
            </Chakra.ModalContent>
        </Chakra.Modal>
    );
};
