import { MenuGroupProps, MenuItemProps } from './Menu.definition';

export const isMenuItem = (value: any): value is MenuItemProps => {
    if (typeof value === 'string') return false;

    const keys = Object.keys(value);

    return keys.includes('label');
};

export const isMenuGroup = (value: any): value is MenuGroupProps => {
    if (typeof value === 'string') return false;

    const props = ['groupItems', 'title'];
    const keys = Object.keys(value);

    return keys.every((key) => props.includes(key));
};
