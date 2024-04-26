'use client';

import React, { useState } from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';

import { colorScheme } from '../../utilities/colorScheme.util';

import { Button, ButtonProps } from '../Button';
import { Lorem } from '../Lorem';

import { Modal, ModalProps } from './Modal.component';

const ModalFixture = () => {
    // MARK: State
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // MARK: Inputs
    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

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
                colorScheme={colors as ModalProps['colorScheme']}
            >
                <p>I'm a basic modal</p>
                {/* <Lorem count={10} /> */}
            </Modal>
        </div>
    );
};

export default ModalFixture;
