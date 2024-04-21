'use client';

import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';

import { Frame } from './Frame.component';

const FrameFixture = () => {
    const [showOverlay] = useFixtureSelect('Show Overlay', {
        options: ['to-left', 'to-right', 'to-top', 'to-bottom', 'undefined'],
        defaultValue: 'undefined',
    });

    return (
        <Frame
            id='frame-id'
            showOverlay={showOverlay !== 'undefined' ? showOverlay : undefined}
        >
            <p>I'm a basic Frame</p>
        </Frame>
    );
};

export default FrameFixture;
