'use client';

import { useFixtureSelect } from 'react-cosmos/client';
import React from 'react';

import { Menu, MenuItemProps } from './Menu.component';

const MenuFixture = () => {
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
        {
            label: 'Item Two',
            onClick: () => alert('Item Two Clicked'),
        },
        {
            label: 'Item Three',
            onClick: () => alert('Item Three Clicked'),
        },
    ];

    return (
        <div className='flex flex-row justify-between p-16'>
            <Menu menuItems={menuItems} />
            <Menu
                menuItems={menuItems}
                align='right'
            />
        </div>
    );
};

export default MenuFixture;
