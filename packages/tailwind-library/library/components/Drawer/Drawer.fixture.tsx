'use client';

import React, { useState } from 'react';

import { Drawer, DrawerProps } from './Drawer.component';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { Button, ButtonProps } from '../Button';
import { Lorem } from '../Lorem';

const divergents: Exclude<DrawerProps['divergent'], undefined | null>[] = [
    'closed',
    'tab',
];

const directions: Exclude<DrawerProps['direction'], undefined | null>[] = [
    'bottom',
    'left',
    'right',
    'top',
];

const sizes: Exclude<DrawerProps['size'], undefined | null>[] = [
    'xl',
    'lg',
    'md',
    'sm',
];

const DrawerFixture = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [direction] = useFixtureSelect('Drawer Direction', {
        options: directions,
        defaultValue: 'right',
    });

    const [divergent] = useFixtureSelect('Drawer Divergent', {
        options: divergents,
        defaultValue: 'closed',
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

    const [size] = useFixtureSelect('Size', {
        options: sizes,
        defaultValue: 'lg',
    });

    return (
        <div className='p-16 h-full'>
            <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
            <Drawer
                confirmCTA={hasConfirmCTA ? confirmCTA : undefined}
                declineCTA={hasDeclineCTA ? declineCTA : undefined}
                divergent={divergent as DrawerProps['divergent']}
                heading={hasHeading ? 'Drawer Header' : undefined}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
                direction={direction}
                size={size}
            >
                {/* <p>I'm a basic modal</p> */}
                <Lorem count={10} />
            </Drawer>
        </div>
    );
};

export default DrawerFixture;
