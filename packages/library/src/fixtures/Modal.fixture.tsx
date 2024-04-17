/* eslint-disable react-hooks/rules-of-hooks */
// Note: React must be declared in all files for cosmos to work
import React, { useState } from 'react';
import { useValue, useSelect } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { Button, FixtureBox, Lorem, Modal } from '../components';

import * as Chakra from '@chakra-ui/react';

const ModalFixture = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [confirmCTA] = useValue<boolean>('Add confirmCTA', {
        defaultValue: false,
    });

    const [declineCTA] = useValue<boolean>('Add declineCTA', {
        defaultValue: false,
    });

    const [LargeContent] = useValue<boolean>('Large Content', {
        defaultValue: false,
    });

    const [size] = useSelect('Size', {
        options: ['sm', 'lg', '2xl'],
        defaultValue: 'lg',
    });

    const [title] = useValue<boolean>('With Title', { defaultValue: false });

    return (
        <FixtureBox hasPadding>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                onClose={() => setIsOpen(false)}
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
        </FixtureBox>
    );
};

// Flickering in fixture stopping UI controls from working correctly It seems to be Chakra's modal that's causing the issue. Boolean UI controls are still effective. Close the modal to change the controls.

export default () => {
    return <ModalFixture />;
};
