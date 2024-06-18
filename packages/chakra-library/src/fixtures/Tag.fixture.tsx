// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox, Tag, TagProps } from '../components';
import { colorScheme } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';

const TagFixture = ({}: TagProps) => {
    const [icon] = useSelect('Icon', {
        options: ['bin', 'comment', 'location', 'thumbs-u'],
    });

    const [iconVariant] = useSelect('Icon Variant', {
        options: ['solid', 'outline'],
    });

    const [iconPosition] = useSelect('Icon Position', {
        options: ['left', 'right', 'undefined'],
        defaultValue: 'undefined',
    });

    const [tagVariant] = useSelect('Tag Variant', {
        options: ['subtle', 'solid', 'outline'],
        defaultValue: 'solid',
    });

    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'white',
    });

    return (
        <FixtureBox hasPadding>
            <Chakra.Heading
                as='h2'
                size='0.75rem'
                color='gray'
            >
                Basic Tag
            </Chakra.Heading>
            <Tag
                variant={tagVariant}
                colorScheme={scheme}
            >
                Tag
            </Tag>

            <Chakra.Heading
                as='h2'
                size='0.75rem'
                color='gray'
            >
                Icon Tag
            </Chakra.Heading>
            <Tag
                icon={{
                    icon: icon,
                    ariaLabel: 'icon-test',
                    variant: iconVariant,
                    position:
                        iconPosition === 'undefined' ? undefined : iconPosition,
                }}
                variant={tagVariant}
                colorScheme={scheme}
            >
                Tag
            </Tag>
        </FixtureBox>
    );
};

export default TagFixture;
