'use client';

import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';

import { colorScheme } from '../../utilities/colorScheme.util';

import { ButtonProps } from '../Button';
import { IconProps } from '../Icon';

import { Tile, TileProps } from './Tile.component';
import { getCase } from '../../helpers';

const divergents: Exclude<TileProps['divergent'], null | undefined>[] = [
    'outline',
    'solid',
    'solidOutline',
];

// MARK: Tile Fixture;

const TileFixture = () => {
    const [canClick] = useFixtureInput<boolean>('Can Click Tile', false);
    const onClick = () => alert('Tile Clicked');

    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

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

    const props: TileProps = {
        colorScheme: colors as TileProps['colorScheme'],
        cta: hasCTA ? cta : undefined,
        description: hasDescription ? description : undefined,
        heading: hasHeading ? 'Heading' : undefined,
        icon,
        onClick: canClick ? () => onClick() : undefined,
    };

    return (
        <div className='flex gap-16 p-16'>
            {divergents.map((divergent) => {
                return (
                    <div
                        className='flex flex-col gap-16 h-fit items-center'
                        key={divergent}
                    >
                        <h2 className='font-bold text-14'>
                            {getCase(divergent, 'sentence').toCapitalisedCase()}
                        </h2>
                        <Tile
                            divergent={divergent}
                            {...props}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default TileFixture;
