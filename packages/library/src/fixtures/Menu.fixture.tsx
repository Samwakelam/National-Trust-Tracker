/* eslint-disable no-useless-computed-key */
// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { Menu, MenuItemProps, MenuProps } from '../components/Menu';
import { FixtureBox } from '../components';

import * as Chakra from '@chakra-ui/react';

const items: MenuItemProps[] = [
    { label: 'Item-1' },
    { label: 'Item-2' },
    { label: 'Item-3' },
];

const MenuFixture = ({ menuItems, buttonConfig }: MenuProps) => {
    const [position] = useSelect('Trigger Placement', {
        options: ['left', 'right'],
        defaultValue: 'left',
    });

    return (
        <FixtureBox
            hasPadding
            alignItems={position === 'left' ? 'flex-start' : 'flex-end'}
        >
            <Menu
                menuItems={menuItems}
                buttonConfig={buttonConfig}
            />
        </FixtureBox>
    );
};

export default {
    'Simple Items': () => <MenuFixture menuItems={items} />,
    'Grouped Menu Items': () => (
        <MenuFixture
            menuItems={[
                { groupItems: items, title: 'Group-1' },
                { groupItems: items, title: 'Group-2' },
            ]}
        />
    ),
    'Items with Divider': () => (
        <MenuFixture menuItems={[items[0]!, items[1]!, 'divider', items[2]!]} />
    ),
    'Groups with Divider': () => (
        <MenuFixture
            menuItems={[
                { groupItems: items, title: 'Group-1' },
                'divider',
                { groupItems: items, title: 'Group-2' },
            ]}
        />
    ),
    ['Items with Icons']: () => {
        const [icon] = useSelect('Icon', {
            options: ['bin', 'comment', 'location', 'thumbs-u'],
        });

        const [variant] = useSelect('Icon Variant', {
            options: ['solid', 'outline'],
        });

        const itemsWithIcons: MenuItemProps[] = [
            { label: 'Item-1', icon: { icon, variant, ariaLabel: icon } },
            { label: 'Item-2', icon: { icon, variant, ariaLabel: icon } },
            { label: 'Item-3', icon: { icon, variant, ariaLabel: icon } },
        ];

        return <MenuFixture menuItems={itemsWithIcons} />;
    },
    ['Button variant']: () => {
        const [variant] = useSelect('Button Variant', {
            options: ['solid', 'outline', 'ghost', 'unstyled'],
            defaultValue: 'ghost',
        });

        return (
            <MenuFixture
                menuItems={items}
                buttonConfig={{ variant: variant }}
            />
        );
    },
};
