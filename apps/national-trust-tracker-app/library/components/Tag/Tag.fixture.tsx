'use client';

import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';

import { Tag, TagProps } from './Tag.component';

const TagFixture = () => {
    const [hasIcon] = useFixtureInput<boolean>('Has Icon', false);
    const [iconVariant] = useFixtureSelect('Icon Variant', {
        options: ['outline', 'solid', 'undefined'],
        defaultValue: 'undefined',
    });
    const icon: TagProps['icon'] = {
        icon: 'thumbs-u',
        ariaLabel: 'great',
        variant: iconVariant === 'undefined' ? undefined : iconVariant,
    };

    return (
        <div className='h-full p-16'>
            <Tag icon={hasIcon ? icon : undefined}>Tag</Tag>{' '}
        </div>
    );
};

export default TagFixture;
