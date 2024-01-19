// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { Card, CardProps, FixtureBox, Lorem } from '../components';
import { PositionType } from '../types';
import { colorScheme } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';

const CardFixture = ({ image }: Pick<CardProps, 'image'>) => {
    const [confirmCTA] = useValue<boolean>('Add confirmCTA', {
        defaultValue: false,
    });

    const [declineCTA] = useValue<boolean>('Add declineCTA', {
        defaultValue: false,
    });

    const [heading] = useValue<boolean>('Add Heading', {
        defaultValue: false,
    });

    const [hasIcon] = useValue<boolean>('Add Icon', { defaultValue: false });

    const [layout] = useSelect('Card Layout', {
        options: ['horizontal', 'vertical'],
        defaultValue: 'vertical',
    });

    const [variant] = useSelect('Card Variant', {
        options: ['elevated', 'filled', 'unstyled', 'outline'],
    });

    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'transparent',
    });

    const [icon] = useSelect('Icon', {
        options: ['bin', 'comment', 'location', 'thumbs-u'],
    });

    const [iconVariant] = useSelect('Icon Variant', {
        options: ['solid', 'outline'],
    });

    const [iconPosition] = useSelect<PositionType | 'undefined'>(
        'Icon Position',
        {
            options: ['left', 'right', 'undefined'],
            defaultValue: 'undefined',
        }
    );

    const [hasNegativeMargin] = useValue<boolean>('Has Negative Margin', {
        defaultValue: false,
    });

    const [longContent] = useValue<boolean>('Show Long Content', {
        defaultValue: false,
    });

    return (
        <FixtureBox hasPadding>
            <Card
                confirmCTA={
                    confirmCTA
                        ? {
                              children: 'Confirm',
                              onClick: () =>
                                  alert('The confirm button has been clicked'),
                          }
                        : undefined
                }
                declineCTA={
                    declineCTA
                        ? {
                              children: 'Cancel',
                              onClick: () =>
                                  alert('The decline button has been clicked'),
                          }
                        : undefined
                }
                hasNegativeMargin={hasNegativeMargin}
                heading={heading ? 'Card Heading' : undefined}
                icon={
                    hasIcon
                        ? {
                              icon: icon,
                              ariaLabel: icon,
                              position:
                                  iconPosition === 'undefined'
                                      ? undefined
                                      : iconPosition,
                              variant: iconVariant,
                          }
                        : undefined
                }
                image={image}
                layout={layout}
                variant={variant}
                colorScheme={scheme}
                // width={hasNegativeMargin ? 'calc(100% + 2rem)' : '100%'}
            >
                {longContent ? <Lorem /> : 'I am a Basic Card'}
            </Card>
        </FixtureBox>
    );
};

export default {
    'Plain Card': () => <CardFixture />,
    'Image Card': () => (
        <CardFixture
            image={{
                src: 'https://ambrey.com/app/uploads/2021/09/IMAGE-GRID_96Res_Medium11-2.png',
            }}
        />
    ),
};
