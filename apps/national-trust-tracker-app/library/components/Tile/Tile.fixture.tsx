'use client';

import React from 'react';
import { Tile } from './Tile.component';
import { useFixtureInput } from 'react-cosmos/client';
import { ButtonProps } from '../Button';
import { IconProps } from '../Icon';

const TileFixture = () => {
    const [canClick] = useFixtureInput<boolean>('Can Click Tile', false);
    const onClick = () => alert('Tile Clicked');

    const [hasCTA] = useFixtureInput<boolean>('Has CTA', false);
    const cta: ButtonProps = {
        children: 'CTA',
        onClick: () => alert('CTA Clicked'),
    };

    const [hasDescription] = useFixtureInput<boolean>('Has Description', false);
    const [hasLongerDescription] = useFixtureInput<boolean>(
        'Has Longer Description',
        false
    );
    const description = hasLongerDescription
        ? 'I am a basic Tile with a longer description'
        : 'I am a basic Tile';

    const [hasHeading] = useFixtureInput<boolean>('Has Heading', false);

    const icon: IconProps = { icon: 'thumbs-u', ariaLabel: 'thumbs up' };

    return (
        <Tile
            cta={hasCTA ? cta : undefined}
            description={hasDescription ? description : undefined}
            heading={hasHeading ? 'Heading' : undefined}
            icon={icon}
            onClick={canClick ? () => onClick() : undefined}
        />
    );
};

export default TileFixture;
