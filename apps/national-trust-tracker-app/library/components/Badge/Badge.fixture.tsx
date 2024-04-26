'use client';

import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';

import { Badge, BadgeProps } from './Badge.component';

const BadgeFixture = () => {
    const [hasIcon] = useFixtureInput<boolean>('Has Icon', false);
    const [iconVariant] = useFixtureSelect('Icon Variant', {
        options: ['outline', 'solid', 'undefined'],
        defaultValue: 'undefined',
    });
    const icon: BadgeProps['icon'] = {
        icon: 'thumbs-u',
        ariaLabel: 'great',
        variant: iconVariant === 'undefined' ? undefined : iconVariant,
    };

    return (
        <div className='h-full p-16'>
            <Badge icon={hasIcon ? icon : undefined}>Badge</Badge>
        </div>
    );
};

export default BadgeFixture;
