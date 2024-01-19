/* eslint-disable react-hooks/rules-of-hooks */
// Note: React must be declared in all files for cosmos to work
import React, { useState } from 'react';
import { useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { Button, FixtureBox, Lorem, Modal, ModalProps } from '../components';

import * as Chakra from '@chakra-ui/react';

const ModalFixture = ({
    isOpen,
    onClose,

    size,
}: Omit<ModalProps, 'children'>) => {
    const [title] = useValue<boolean>('With Title', { defaultValue: false });

    const [LargeContent] = useValue<boolean>('Large Content', {
        defaultValue: false,
    });

    const [confirmCTA] = useValue<boolean>('Add confirmCTA', {
        defaultValue: false,
    });

    const [declineCTA] = useValue<boolean>('Add declineCTA', {
        defaultValue: false,
    });

    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            confirmCTA={
                confirmCTA
                    ? {
                          children: 'Confirm',
                          onClick: () =>
                              alert('The confirm button has been clicked'),
                      }
                    : undefined
            }
            declineCTA={
                declineCTA
                    ? {
                          children: 'Cancel',
                          onClick: () =>
                              alert('The decline button has been clicked'),
                      }
                    : undefined
            }
            title={title ? 'Modal Title' : undefined}
            size={size}
        >
            <Chakra.VStack
                alignItems='center'
                justifyContent='center'
            >
                {!LargeContent ? (
                    <Chakra.Text>I'm a basic modal</Chakra.Text>
                ) : (
                    <Lorem count={6} />
                )}
            </Chakra.VStack>
        </Modal>
    );
};

// Flickering in fixture stopping UI controls from working correctly It seems to be Chakra's modal that's causing the issue. Boolean UI controls are still effective.

export default {
    'Always open': () => {
        return (
            <ModalFixture
                isOpen={true}
                onClose={() => alert('onClose has been called')}
            />
        );
    },

    'Size Small': () => {
        return (
            <ModalFixture
                isOpen={true}
                onClose={() => alert('onClose has been called')}
                size='sm'
            />
        );
    },
    'Size Large': () => {
        return (
            <ModalFixture
                isOpen={true}
                onClose={() => alert('onClose has been called')}
                size='lg'
            />
        );
    },
    'Size XL': () => {
        return (
            <ModalFixture
                isOpen={true}
                onClose={() => alert('onClose has been called')}
                size='2xl'
            />
        );
    },
    'With Trigger': () => {
        const [isOpen, setIsOpen] = useState<boolean>(false);

        return (
            <FixtureBox hasPadding>
                <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
                <ModalFixture
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            </FixtureBox>
        );
    },
};
