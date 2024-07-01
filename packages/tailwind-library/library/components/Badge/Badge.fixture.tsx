'use client';

import React from 'react';
import { useValue, useSelect } from 'react-cosmos/client';

import { Badge, BadgeProps } from './Badge.component';
import { colorScheme } from '../../utilities/colorScheme.util';
import { getCase } from '../../helpers/getCase.helper';

const divergents: Exclude<BadgeProps['divergent'], undefined | null>[] = [
    'outline',
    'soft',
    'solid',
    'solidOutline',
];

const BadgeFixture = () => {
    const [colors] = useSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    const [hasIcon] = useValue<boolean>('Has Icon', {
        defaultValue: false,
    });
    const [iconVariant] = useSelect('Icon Variant', {
        options: ['outline', 'solid', 'undefined'],
        defaultValue: 'undefined',
    });
    const icon: BadgeProps['icon'] = {
        icon: 'thumbs-u',
        ariaLabel: 'great',
        variant: iconVariant === 'undefined' ? undefined : iconVariant,
    };

    return (
        <div className=' flex flex-flow flex-wrap gap-16 h-full p-16'>
            {divergents.map((divergent) => {
                return (
                    <div
                        className='flex flex-col gap-16 h-fit items-center'
                        key={`tag-${divergent}`}
                    >
                        <h2 className='font-bold text-14'>
                            {getCase(divergent, 'sentence').toCapitalisedCase()}
                        </h2>
                        <Badge
                            colorScheme={colors as BadgeProps['colorScheme']}
                            icon={hasIcon ? icon : undefined}
                            divergent={divergent}
                        >
                            Badge
                        </Badge>
                    </div>
                );
            })}
        </div>
    );
};

export default BadgeFixture;
