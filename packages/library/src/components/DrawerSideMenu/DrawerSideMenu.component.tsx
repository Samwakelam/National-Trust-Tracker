import React, { ReactElement, useEffect, useRef } from 'react';

import { Drawer, DrawerProps, Icon, IconProps } from '..';

import * as Chakra from '@chakra-ui/react';

type MenuItemProps = {
    slug?: string;
    onClick?: () => void;
    label: string;
    icon?: IconProps;
    isAllowed?: boolean;
    isActive?: boolean;
    as: any;
};

export interface SideMenuProps extends Omit<DrawerProps, 'children'> {
    menuItems: MenuItemProps[];
    subMenuItems?: MenuItemProps[];
    location?: {
        pathname: string;
    };
}

const [StylesProvider, useStyles] = Chakra.createStylesContext('SideMenu');

const DrawerSideMenuComponent = ({
    isOpen,
    menuItems,
    onClose,
    subMenuItems,
    location,
    ...props
}: SideMenuProps): ReactElement<SideMenuProps> => {
    const styles = useStyles();

    const locationRef = useRef<string>(location?.pathname || null);

    useEffect(() => {
        if (location && locationRef.current !== location.pathname) {
            //@ts-ignore
            locationRef.current = location.pathname;
            setTimeout(() => {
                onClose();
            }, 100);
        }
    }, [location]);

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement='left'
            size='xs'
            {...props}
        >
            <Chakra.Box
                as='nav'
                __css={styles.container}
            >
                <Chakra.UnorderedList sx={styles.menu}>
                    {menuItems.map((menuItem) => (
                        <MenuItem
                            sx={styles.link || {}}
                            menuItem={menuItem}
                            key={`menu-${menuItem.label}`}
                        />
                    ))}
                </Chakra.UnorderedList>

                {subMenuItems && (
                    <Chakra.UnorderedList sx={styles.subMenu}>
                        {subMenuItems.map((menuItem) => (
                            <MenuItem
                                sx={styles.subMenuLink || {}}
                                menuItem={menuItem}
                                key={`sub-menu-${menuItem.label}`}
                            />
                        ))}
                    </Chakra.UnorderedList>
                )}
            </Chakra.Box>
        </Drawer>
    );
};

export const DrawerSideMenu = ({
    colorScheme,
    ...props
}: SideMenuProps): ReactElement<SideMenuProps> => {
    const styles = Chakra.useMultiStyleConfig('SideMenu', { colorScheme });

    return (
        <StylesProvider value={styles}>
            <DrawerSideMenuComponent {...props} />
        </StylesProvider>
    );
};

type ListItemProps = {
    sx: Chakra.SystemStyleObject;
    item: Pick<MenuItemProps, 'icon' | 'label' | 'isActive'>;
};

const ListItem = ({ sx, item }: ListItemProps) => {
    const { icon, label, isActive } = item;

    return (
        <Chakra.ListItem
            sx={sx}
            listStyleType='none'
            listStylePosition='unset'
            data-active={isActive ? true : false}
            aria-label={isActive ? 'active' : undefined}
        >
            {icon && <Icon {...icon} />}
            {label}
        </Chakra.ListItem>
    );
};

type MenuListItemProps = {
    sx: Chakra.SystemStyleObject;
    menuItem: MenuItemProps;
};

const MenuItem = ({ sx, menuItem }: MenuListItemProps) => {
    const { isAllowed = true, onClick, slug, as, ...props } = menuItem;

    if (!isAllowed) {
        return null;
    }

    if (slug) {
        return (
            <Chakra.Link
                as={as}
                to={slug}
                href={slug}
                textDecoration='none'
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <ListItem
                    sx={sx}
                    item={props}
                />
            </Chakra.Link>
        );
    }

    return (
        <ListItem
            sx={sx}
            item={props}
        />
    );
};
