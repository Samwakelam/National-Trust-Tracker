// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox, Frame } from '../components';
import { colorScheme } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';

const containerProps: Chakra.StackProps = {
    bg: 'pink.100',
    _dark: {
        bg: 'pink.500',
    },
    minH: '3rem',
    w: '100%',
    justifyContent: 'center',
    textAlign: 'center',
};

const FrameFixture = () => {
    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'transparent',
    });

    const [isCoupled] = useValue<boolean>('Is Coupled', {
        defaultValue: false,
    });

    const [isWideWidth] = useValue<boolean>('Is Wide Width', {
        defaultValue: false,
    });

    const [size] = useSelect('Size', {
        options: ['sm', 'banner', 'lg'],
        defaultValue: 'sm',
    });

    return (
        <FixtureBox>
            <Frame
                id='FrameFixture'
                colorScheme={scheme}
                isCoupled={isCoupled}
                isWideWidth={isWideWidth}
                size={size}
            >
                <Chakra.HStack {...containerProps}>
                    <p>
                        I am the inside content in frame. Resize the window to
                        see the effect
                    </p>
                </Chakra.HStack>
            </Frame>
            <Frame
                id='FrameFixture'
                isCoupled={isCoupled}
                isWideWidth={isWideWidth}
                size={size}
            >
                <Chakra.HStack {...containerProps}>
                    <p>
                        The Content boxes have been given backgrounds for you to
                        see the changes in content and padding sizes in cosmos.
                    </p>
                </Chakra.HStack>
            </Frame>
            <Frame
                id='FrameFixture'
                colorScheme={scheme}
                isCoupled={isCoupled}
                isWideWidth={isWideWidth}
                size={size}
            >
                <Chakra.HStack {...containerProps}>
                    <p>
                        The Frame has been given backgrounds for you to see the
                        changes in content and padding sizes. This can be
                        changed in the apps too.
                    </p>
                </Chakra.HStack>
            </Frame>
        </FixtureBox>
    );
};

export default FrameFixture;
