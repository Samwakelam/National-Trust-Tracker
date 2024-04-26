'use client';

import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import React from 'react';

import { Menu, MenuItemProps } from './Menu.component';

const MenuFixture = () => {
    const [alwaysOpen] = useFixtureInput<boolean>('Always Open', false);

    const [hasSingleItem] = useFixtureInput<boolean>(
        'Has Single Menu Item',
        false
    );

    const [iconVariant] = useFixtureSelect('Icon Variant', {
        options: ['outline', 'solid', 'undefined'],
        defaultValue: 'undefined',
    });
    const icon: MenuItemProps['icon'] = {
        icon: 'thumbs-u',
        ariaLabel: 'great',
        variant: iconVariant === 'undefined' ? undefined : iconVariant,
    };

    const menuItems = [
        {
            label: 'Item One',
            onClick: () => alert('Item One Clicked'),
            icon,
        },
        ...(hasSingleItem
            ? []
            : [
                  {
                      label: 'Item Two',
                      onClick: () => alert('Item Two Clicked'),
                  },
                  {
                      label: 'Item Three',
                      onClick: () => alert('Item Three Clicked'),
                  },
              ]),
    ];

    return (
        <div className='flex flex-row justify-between p-16'>
            <Menu
                menuItems={menuItems}
                alwaysOpen={alwaysOpen}
            />
            <Menu
                menuItems={menuItems}
                align='right'
                alwaysOpen={alwaysOpen}
            />
        </div>
    );
};

export default MenuFixture;
