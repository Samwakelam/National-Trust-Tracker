'use client';

import React, { useState } from 'react';

import { Modal } from './Modal.component';
import { useFixtureInput } from 'react-cosmos/client';
import { Button, ButtonProps } from '../Button';
import { Lorem } from '../Lorem';

const ModalFixture = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [hasHeading] = useFixtureInput<boolean>('Has Heading', false);

    const [hasConfirmCTA] = useFixtureInput<boolean>('Has Confirm CTA', false);
    const confirmCTA: ButtonProps = {
        children: 'Confirm',
        onClick: () => alert('Confirm CTA Clicked'),
    };

    const [hasDeclineCTA] = useFixtureInput<boolean>('Has Decline CTA', false);
    const declineCTA: ButtonProps = {
        children: 'Cancel',
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                confirmCTA={hasConfirmCTA ? confirmCTA : undefined}
                declineCTA={hasDeclineCTA ? declineCTA : undefined}
                heading={hasHeading ? 'Modal Header' : undefined}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                {/* <p>I'm a basic modal</p> */}
                <Lorem count={10} />
            </Modal>
        </>
    );
};

export default ModalFixture;
