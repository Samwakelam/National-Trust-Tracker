// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import {
    ButtonProps,
    Card,
    CardProps,
    FixtureBox,
    HeadingProps,
    Lorem,
    MenuProps,
    Icon as IconComponent,
} from '../components';
import { PositionType } from '../types';
import { colorScheme } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';

const CardFixture = () => {
    const [confirmCTA] = useValue<boolean>('Add ConfirmCTA', {
        defaultValue: false,
    });

    const [declineCTA] = useValue<boolean>('Add DeclineCTA', {
        defaultValue: false,
    });

    const [footerItems] = useValue<boolean>('Add Footer Items', {
        defaultValue: false,
    });

    const [heading] = useValue<boolean>('Add Heading', {
        defaultValue: false,
    });

    const [hasIcon] = useValue<boolean>('Add Icon', { defaultValue: false });

    const [image] = useValue<boolean>('Add Image', {
        defaultValue: false,
    });

    const [menu] = useValue<boolean>('Add Menu', { defaultValue: false });

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

    const [headingPreset] = useSelect('Heading preset', {
        options: ['sub-heading', 'frame-heading'],
        defaultValue: 'sub-heading',
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

    const [isInset] = useValue<boolean>('Inset Image', {
        defaultValue: false,
    });

    const [longContent] = useValue<boolean>('Show Long Content', {
        defaultValue: false,
    });

    const ConfirmCTA: ButtonProps = {
        children: 'Confirm',
        onClick: () => alert('The confirm button has been clicked'),
    };
    const DeclineCTA: ButtonProps = {
        children: 'Cancel',
        onClick: () => alert('The decline button has been clicked'),
    };

    const Heading: HeadingProps = {
        children: 'Card Heading',
        preset: headingPreset,
    };
    const Icon: CardProps['icon'] = {
        icon: icon,
        ariaLabel: icon,
        position: iconPosition === 'undefined' ? undefined : iconPosition,
        variant: iconVariant,
    };
    const Image = {
        src: 'https://ambrey.com/app/uploads/2021/09/IMAGE-GRID_96Res_Medium11-2.png',
    };
    const Menu: MenuProps = {
        menuItems: [
            { label: 'Item-1' },
            { label: 'Item-2' },
            { label: 'Item-3' },
        ],
    };
    const FooterItems: CardProps['footerItems'] = [
        { icon: 'circle-plus', ariaLabel: 'plus', type: 'Icon', id: '1' },
        { icon: 'circle-remove', ariaLabel: 'remove', type: 'Icon', id: '2' },
        { icon: 'circle-tick', ariaLabel: 'tick', type: 'Icon', id: '3' },
        {
            children: 'Tag',
            colorScheme: 'blue',
            variant: 'subtle',
            type: 'Tag',
            id: '5',
        },
    ];

    return (
        <FixtureBox hasPadding>
            <Card
                colorScheme={scheme}
                confirmCTA={confirmCTA ? ConfirmCTA : undefined}
                declineCTA={declineCTA ? DeclineCTA : undefined}
                hasNegativeMargin={hasNegativeMargin}
                heading={heading ? Heading : undefined}
                icon={hasIcon ? Icon : undefined}
                image={image ? { ...Image, isInset } : undefined}
                layout={layout}
                menu={menu ? Menu : undefined}
                variant={variant}
                footerItems={footerItems ? FooterItems : undefined}
            >
                {longContent ? <Lorem /> : 'I am a Basic Card'}
            </Card>
        </FixtureBox>
    );
};

export default () => <CardFixture />;
