/* eslint-disable no-useless-computed-key */

// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { Bar, Button, FixtureBox } from '../components';
import { colorScheme } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';
import { BarFloating } from '../components/BarFloating/BarFloating.component';

const BarFixture = () => {
    const [menu] = useValue<boolean>('Add Menu', { defaultValue: false });

    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'gray',
    });

    const [size] = useSelect('Size', {
        options: ['sm', 'lg'],
        defaultValue: 'lg',
    });

    const [button] = useValue<boolean>('Add Content Button', {
        defaultValue: false,
    });

    return (
        <FixtureBox>
            <Bar
                menu={
                    menu
                        ? {
                              onClick: () => alert('menu button clicked'),
                          }
                        : undefined
                }
                colorScheme={scheme}
                size={size}
            >
                <Chakra.Heading as='h3'>I am a Basic Bar</Chakra.Heading>
                {button && (
                    <Button
                        variant='solid'
                        colorScheme={scheme}
                    >
                        Button
                    </Button>
                )}
            </Bar>
        </FixtureBox>
    );
};

const BarFloatingFixture = () => {
    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'gray',
    });

    return (
        <FixtureBox>
            <BarFloating colorScheme={scheme}>
                <Chakra.Heading
                    as='h3'
                    fontSize={16}
                >
                    I am a Basic Bar
                </Chakra.Heading>
            </BarFloating>
        </FixtureBox>
    );
};

export default {
    'Bar': () => <BarFixture />,
    'Floating Bar': () => <BarFloatingFixture />,
};
