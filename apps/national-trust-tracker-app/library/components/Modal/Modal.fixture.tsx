'use client';

import React, { useState } from 'react';

import { Modal } from './Modal.component';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
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

    const [preset] = useFixtureSelect('Preset', {
        options: ['undefined', 'confirm'],
    });

    return (
        <div className='p-16 h-full'>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal
                confirmCTA={hasConfirmCTA ? confirmCTA : undefined}
                declineCTA={hasDeclineCTA ? declineCTA : undefined}
                heading={hasHeading ? 'Modal Header' : undefined}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                preset={preset !== 'undefined' ? preset : undefined}
            >
                <p>I'm a basic modal</p>
                {/* <Lorem count={10} /> */}
            </Modal>
        </div>
    );
};

export default ModalFixture;
