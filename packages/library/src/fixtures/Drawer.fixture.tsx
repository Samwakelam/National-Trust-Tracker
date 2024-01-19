/* eslint-disable react-hooks/rules-of-hooks */
// Note: React must be declared in all files for cosmos to work
import React, { useState } from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { Button, Drawer, DrawerProps, FixtureBox, Lorem } from '../components';

const DrawerFixture = ({ isOpen, onClose }: Omit<DrawerProps, 'children'>) => {
    const [confirmCTA] = useValue<boolean>('Add confirmCTA', {
        defaultValue: false,
    });

    const [showOverlay] = useValue<boolean>('Show Overlay', {
        defaultValue: true,
    });

    const [title] = useValue<boolean>('With Title', { defaultValue: false });

    const [placement] = useSelect('Placement', {
        options: ['left', 'top', 'bottom', 'right'],
        defaultValue: 'right',
    });

    const [size] = useSelect('Size', {
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
        defaultValue: 'lg',
    });

    return (
        <Drawer
            isOpen={isOpen}
            onClose={() => onClose()}
            confirmCTA={
                confirmCTA
                    ? {
                          children: 'Confirm',
                          onClick: () =>
                              alert('The confirm button has been clicked'),
                      }
                    : undefined
            }
            title={title ? 'Drawer Title' : undefined}
            showOverlay={showOverlay}
            size={size}
            placement={placement}
        >
            <Lorem count={6} />
        </Drawer>
    );
};

// Flickering in fixture stopping UI controls from working correctly It seems to be Chakra's modal that's causing the issue (drawer is a modal under the hood). Close the Drawer for choices to take effect.

export default () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <FixtureBox hasPadding>
            <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
            <DrawerFixture
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </FixtureBox>
    );
};
