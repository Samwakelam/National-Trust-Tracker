// Note: React must be declared in all files for cosmos to work
import React, { ReactElement } from 'react';

import { Button, Icon } from '..';

import { MenuItem, MenuProps } from './Menu.definition';
import { isMenuGroup, isMenuItem } from './Menu.guards';

import * as Chakra from '@chakra-ui/react';

export const Menu = ({
    menuItems,
    menuConfig,
    menuListConfig,
    buttonConfig,
}: MenuProps): ReactElement<MenuProps> => {
    const theme = Chakra.useTheme();

    return (
        <Chakra.Menu {...menuConfig}>
            <Chakra.MenuButton as={Chakra.Box}>
                <Button
                    icon={{ icon: 'menu-three', ariaLabel: 'menu' }}
                    variant='outline'
                    {...buttonConfig}
                />
            </Chakra.MenuButton>
            <Chakra.MenuList {...menuListConfig}>
                {menuItems.map((item, index) =>
                    resolveMenuItem(item, index, theme)
                )}
            </Chakra.MenuList>
        </Chakra.Menu>
    );
};

const resolveMenuItem = (
    item: MenuItem,
    index: number,
    theme: Chakra.StyleFunctionProps['theme']
) => {
    const { space } = theme;

    if (item === 'divider')
        return <Chakra.MenuDivider key={`divider-${index}`} />;

    if (isMenuGroup(item))
        return (
            <Chakra.MenuGroup
                key={`group-${index}-${item.title}`}
                title={item.title}
            >
                {item.groupItems.map((groupItem, idx) =>
                    resolveMenuItem(groupItem, idx, theme)
                )}
            </Chakra.MenuGroup>
        );

    if (isMenuItem(item)) {
        const { label, image, icon, config, ...props } = item;
        return (
            <Chakra.MenuItem
                key={`item-${index}-${label}`}
                icon={icon && <Icon {...icon} />}
                padding={`${space[4]} ${space[8]}`}
                {...config}
                {...props}
            >
                {item.image && (
                    <Chakra.Image
                        boxSize={24}
                        borderRadius='full'
                        alt={label}
                        mr={space[12]}
                        {...image}
                    />
                )}
                <span>{label}</span>
            </Chakra.MenuItem>
        );
    }
};
