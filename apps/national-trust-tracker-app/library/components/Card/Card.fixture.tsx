'use client';

import React from 'react';
import { useFixtureInput } from 'react-cosmos/client';

import { Card } from './Card.component';
import { ButtonProps } from '../Button';

const CardFixture = () => {
    const image = {
        src: 'https://ambrey.com/app/uploads/2021/09/IMAGE-GRID_96Res_Medium11-2.png',
        alt: 'placeholder',
    };

    const confirmCTA: ButtonProps = {
        children: 'Confirm',
        onClick: () => alert('Confirm CTA Clicked'),
    };

    const declineCTA: ButtonProps = {
        children: 'Cancel',
        onClick: () => alert('Decline CTA Clicked'),
    };

    const [hasConfirmCTA] = useFixtureInput<boolean>('Has Confirm CTA', false);

    const [hasDeclineCTA] = useFixtureInput<boolean>('Has Decline CTA', false);

    return (
        <Card
            heading='I am a basic Header'
            // image={image}
            confirmCTA={hasConfirmCTA ? confirmCTA : undefined}
            declineCTA={hasDeclineCTA ? declineCTA : undefined}
            variant={['vertical']}
        >
            <div>Basic Card Content</div>
        </Card>
    );
};

export default CardFixture;
