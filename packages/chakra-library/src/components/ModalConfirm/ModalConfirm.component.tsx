import React, { ReactElement } from 'react';

import { ButtonProps, Modal, ModalProps } from '..';

import * as Chakra from '@chakra-ui/react';

export interface ModalConfirmProps extends Omit<ModalProps, 'children'> {
    confirmCTA: ButtonProps;
    declineCTA?: ButtonProps;
    description?: string | string[];
    children?: ModalProps['children'];
}

export const ModalConfirm = ({
    confirmCTA,
    declineCTA,
    description = "Clicking confirm will be permanent and can't be undone.",
    isOpen,
    onClose,
    title = 'Are you sure?',
    children,
}: ModalConfirmProps): ReactElement<ModalConfirmProps> => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            declineCTA={{
                variant: 'outline',
                colorScheme: 'facebook',
                onClick: onClose,
                children: 'Cancel',
                ...declineCTA,
            }}
            confirmCTA={{
                variant: 'solid',
                colorScheme: 'facebook',
                ...confirmCTA,
            }}
        >
            <Chakra.Flex
                direction='column'
                gap='1.5rem'
                alignItems='center'
                marginTop='-16px'
            >
                <Chakra.Heading
                    as='h2'
                    textAlign='center'
                >
                    {title}
                </Chakra.Heading>
                {Array.isArray(description) ? (
                    description.map((_description, index) => {
                        return (
                            <Chakra.Text
                                as='p'
                                textAlign='center'
                                key={`modal-confirm-description:${
                                    _description.split(' ')[0]
                                }-${index}`}
                            >
                                {_description}
                            </Chakra.Text>
                        );
                    })
                ) : (
                    <Chakra.Text
                        as='p'
                        textAlign='center'
                    >
                        {description}
                    </Chakra.Text>
                )}
                {children}
            </Chakra.Flex>
        </Modal>
    );
};
