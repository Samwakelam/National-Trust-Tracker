'use client';

import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';

import { colorScheme } from '../../utilities/colorScheme.util';

import { Frame, FrameProps } from './Frame.component';

const divergents: Exclude<FrameProps['divergent'], null | undefined>[] = [
    'banner',
    'section',
];

const FrameFixture = () => {
    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    const [hasImage] = useFixtureInput<boolean>('Has Image', false);
    const bgImage: FrameProps['bgImage'] =
        'https://ambrey.com/app/uploads/2021/09/IMAGE-GRID_96Res_Medium11-2.png';

    const [overlayDirection] = useFixtureSelect('Show Overlay', {
        options: ['to-left', 'to-right', 'to-top', 'to-bottom'],
        defaultValue: 'to-right',
    });

    const props: Partial<FrameProps> = {
        overlayDirection,
        bgImage: hasImage ? bgImage : undefined,
    };

    return (
        <div>
            <Frame
                id='frame-id-banner'
                divergent='banner'
                {...props}
            >
                <p>I'm a Banner Frame</p>
            </Frame>
            <Frame
                id='frame-id-section-one'
                divergent='section'
                colorScheme={colors as FrameProps['colorScheme']}
                {...props}
            >
                <p>I'm a Section Frame</p>
            </Frame>
            <Frame
                id='frame-id-section-one'
                divergent='section'
                {...props}
            >
                <p>I'm a Section Frame</p>
            </Frame>
            <Frame
                id='frame-id-section-one'
                divergent='section'
                colorScheme={colors as FrameProps['colorScheme']}
                {...props}
            >
                <p>I'm a Section Frame</p>
            </Frame>
        </div>
    );
};

export default FrameFixture;
