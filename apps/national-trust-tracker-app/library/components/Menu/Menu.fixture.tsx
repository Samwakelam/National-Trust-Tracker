'use client';

import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import React, { useState } from 'react';

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

    const [isLoading, setIsLoading] = useState<number>(0);

    const handleClick = (item: number) => {
        setIsLoading(item);
        setTimeout(() => {
            setIsLoading(0);
        }, 500);
    };

    const menuItems = [
        {
            label: 'Item One',
            onClick: () => handleClick(1),
            isLoading: isLoading === 1,
            icon,
        },
        ...(hasSingleItem
            ? []
            : [
                  {
                      label: 'Item Two',
                      onClick: () => handleClick(2),
                      isLoading: isLoading === 2,
                  },
                  {
                      label: 'Item Three',
                      onClick: () => handleClick(3),
                      isLoading: isLoading === 3,
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
