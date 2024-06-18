import { ButtonProps, IconProps } from '..';

import * as Chakra from '@chakra-ui/react';

export interface MenuItemProps
    extends Omit<Chakra.MenuItemProps, 'children' | 'icon'> {
    icon?: IconProps;
    image?: Chakra.ImageProps;
    slug?: string;
    target?: string;
    label: string;
}

export type MenuGroupProps = {
    groupItems: MenuItemProps[];
    title: string;
};

export interface MenuOptionProps extends Chakra.MenuOptionGroupProps {}

export type MenuItem = 'divider' | MenuItemProps | MenuGroupProps;

export type MenuProps = {
    menuItems: MenuItem[];
    menuConfig?: Chakra.MenuProps;
    menuListConfig?: Chakra.MenuListProps;
    buttonConfig?: Omit<ButtonProps, 'onClick'>;
};
