'use client';

import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';

import { Tag, TagProps } from './Tag.component';
import { colorScheme } from '../../utilities/colorScheme.util';
import { getCase } from '../../helpers';

const divergents: Exclude<TagProps['divergent'], undefined | null>[] = [
    'outline',
    'soft',
    'solid',
    'solidOutline',
];

// MARK:Tag Fixture

const TagFixture = () => {
    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

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

    const props: TagProps = {
        icon: hasIcon ? icon : undefined,
        colorScheme: colors as TagProps['colorScheme'],
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
                        <Tag
                            divergent={divergent}
                            {...props}
                        >
                            Tag
                        </Tag>
                    </div>
                );
            })}
        </div>
    );
};

export default TagFixture;
