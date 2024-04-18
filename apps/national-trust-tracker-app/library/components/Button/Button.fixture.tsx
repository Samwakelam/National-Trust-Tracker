'use client';

import React from 'react';
import { Button, ButtonProps } from './Button.component';
import { useFixtureSelect } from 'react-cosmos/client';

const ButtonFixture = () => {
    const [iconPosition] = useFixtureSelect('Icon Position', {
        options: ['left', 'right', 'undefined'],
        defaultValue: 'undefined',
    });

    const [iconVariant] = useFixtureSelect('Icon Variant', {
        options: ['outline', 'solid', 'undefined'],
        defaultValue: 'undefined',
    });

    const icon: ButtonProps['icon'] = {
        icon: 'thumbs-u',
        ariaLabel: 'great',
        position: iconPosition === 'undefined' ? undefined : iconPosition,
        variant: iconVariant === 'undefined' ? undefined : iconVariant,
    };

    return (
        <div className='flex flex-col gap-16'>
            <div className='flex flex-row gap-8'>
                <Button>Button</Button>
            </div>

            <div className='flex flex-row gap-8'>
                <Button icon={icon}>Button</Button>
                <Button icon={icon} />
            </div>
        </div>
    );
};

export default ButtonFixture;
