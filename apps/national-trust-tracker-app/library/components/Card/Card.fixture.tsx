'use client';

import React from 'react';
import { useFixtureInput } from 'react-cosmos/client';

import { Card, CardProps } from './Card.component';
import { ButtonProps } from '../Button';
import { MenuProps } from '../Menu';

const CardFixture = () => {
    const image = {
        src: 'https://ambrey.com/app/uploads/2021/09/IMAGE-GRID_96Res_Medium11-2.png',
        alt: 'placeholder',
    };

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

    return (
        <Card
            heading='I am a basic Header'
            // image={image}
            confirmCTA={hasConfirmCTA ? confirmCTA : undefined}
            declineCTA={hasDeclineCTA ? declineCTA : undefined}
            variant={['vertical']}
            menu={hasMenu ? menu : undefined}
            indicators={hasIndicators ? indicators : undefined}
        >
            <div>Basic Card Content</div>
        </Card>
    );
};

export default CardFixture;
