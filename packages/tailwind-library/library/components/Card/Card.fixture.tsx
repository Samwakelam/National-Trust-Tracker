'use client';

import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';

import { colorScheme } from '../../utilities/colorScheme.util';

import { Card, CardProps } from './Card.component';
import { ButtonProps } from '../Button';
import { MenuProps } from '../Menu';

import '../../prototypes/String.extensions';
import { twMerge } from 'tailwind-merge';
import { getCase } from '../../helpers';

const divergents: Exclude<CardProps['divergent'], null | undefined>[] = [
    'ghost',
    'outline',
    'solid',
    'solidOutline',
];

const CardFixture = () => {
    const [canClick] = useFixtureInput<boolean>('Can Click Card', false);
    const onClick = () => alert('Card Clicked');

    const [cardDirection] = useFixtureSelect('Card Direction', {
        options: ['vertical', 'horizontal'],
        defaultValue: 'vertical',
    });

    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    const [hasBubbleDetail] = useFixtureInput<boolean>(
        'Has Bubble Detail',
        false
    );
    const bubble = <h3 className='font-semibold'>Bubble Heading</h3>;

    const [hasConfirmCTA] = useFixtureInput<boolean>('Has Confirm CTA', false);
    const confirmCTA: ButtonProps = {
        children: 'Confirm',
        onClick: () => alert('Confirm CTA Clicked'),
    };

    const [hasDeclineCTA] = useFixtureInput<boolean>('Has Decline CTA', false);
    const declineCTA: ButtonProps = {
        children: 'Cancel',
        onClick: () => alert('Decline CTA Clicked'),
    };

    const [hasHeading] = useFixtureInput<boolean>('Has Heading', false);

    const [hasImage] = useFixtureInput<boolean>('Has Image', false);
    const image = {
        src: 'https://ambrey.com/app/uploads/2021/09/IMAGE-GRID_96Res_Medium11-2.png',
        alt: 'placeholder',
    };

    const [hasIndicators] = useFixtureInput<boolean>('Has Indicators', false);
    const indicators: CardProps['indicators'] = [
        {
            type: 'icon',
            icon: 'thumbs-u',
            ariaLabel: 'great',
            id: 'thumbs-up',
        },
        { type: 'tag', children: 'tag', id: 'tag-1' },
    ];

    const [hasMenu] = useFixtureInput<boolean>('Has Menu', false);
    const menu: MenuProps = {
        menuItems: [
            {
                label: 'Item One',
                onClick: () => alert('Item One Clicked'),
                icon: {
                    icon: 'thumbs-u',
                    ariaLabel: 'great',
                },
            },
            {
                label: 'Item Two',
                onClick: () => alert('Item Two Clicked'),
            },
            {
                label: 'Item Three',
                onClick: () => alert('Item Three Clicked'),
            },
        ],
    };

    const props: Partial<CardProps> = {
        confirmCTA: hasConfirmCTA ? confirmCTA : undefined,
        declineCTA: hasDeclineCTA ? declineCTA : undefined,
        detail: hasBubbleDetail ? bubble : undefined,
        heading: hasHeading ? 'I am a basic Header' : undefined,
        image: hasImage ? image : undefined,
        indicators: hasIndicators ? indicators : undefined,
        direction: cardDirection,
        menu: hasMenu ? menu : undefined,
        onClick: canClick ? () => onClick() : undefined,
        colorScheme: colors as CardProps['colorScheme'],
    };

    // MARK: Return

    return (
        <div
            className={twMerge(
                'h-full grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 p-16',
                cardDirection === 'vertical' && 'sm:grid-cols-2'
            )}
        >
            {divergents.map((divergent) => {
                return (
                    <div
                        className='flex flex-col gap-16'
                        key={divergent}
                    >
                        <h2 className='font-bold'>
                            {getCase(divergent, 'sentence').toCapitalisedCase()}
                        </h2>
                        <Card
                            divergent={divergent}
                            {...props}
                        >
                            <p>Basic Card Content</p>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
};

export default CardFixture;
