'use client';

import React, { ReactElement, useEffect, useState } from 'react';

import { Button } from '../Button';
import { Icon, IconProps } from '../Icon';
import { MenuItemStyles, MenuStyles, menuItemStyles } from './Menu.styles';
import { twMerge } from '../../utilities/twMerge.util';
import { isolateClickEvent } from '../../helpers/isolateClickEvent.helper';

// MARK: Types

export interface MenuProps extends MenuStyles {
    align?: 'left' | 'right';
    alwaysOpen?: boolean;
    menuItems: MenuItemProps[];
}

// MARK: Menu
export const Menu = ({
    align = 'left',
    alwaysOpen,
    colorScheme,
    menuItems,
}: MenuProps): ReactElement<MenuProps> => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // MARK: Effects

    useEffect(() => {
        if (alwaysOpen) {
            setIsOpen(alwaysOpen);
        } else {
            setIsOpen(false);
        }
    }, [alwaysOpen]);
    // MARK: Return

    return (
        <div
            data-label='menu'
            className='inline-block relative'
        >
            <Button
                size='sm'
                divergent='ghost'
                colorScheme={colorScheme}
                data-label='menu-button'
                onClick={(e) => {
                    e.stopPropagation();
                    if (alwaysOpen) return;
                    setIsOpen(!isOpen);
                }}
                icon={{ icon: 'menu-dots-v', ariaLabel: 'menu' }}
            />
            <ul
                data-label='menu-content'
                className={twMerge(
                    'absolute min-w-120 z-1 flex flex-col gap-2',
                    isOpen ? 'flex' : 'hidden',
                    align === 'left' ? 'left-0' : 'right-0'
                )}
            >
                {menuItems.map((item) => (
                    <MenuItem
                        key={`menu-item-${item.label}`}
                        {...item}
                    />
                ))}
            </ul>
        </div>
    );
};

// MARK: Menu Item Types

type MenuItemLinkProps = {
    href: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    download?: boolean;
    children: ReactElement | ReactElement[];
};

export interface MenuItemProps extends MenuItemStyles {
    icon?: IconProps;
    label: string;
    onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    link?: Omit<MenuItemLinkProps, 'children'>;
}

// MARK: Menu Item

const MenuItemComponent = ({
    onClick,
    label,
    icon,
}: Omit<MenuItemProps, 'link'>) => {
    const styles = menuItemStyles({});

    return (
        <li
            data-label='menu-item'
            className={twMerge(styles)}
            onClick={isolateClickEvent(onClick)}
        >
            {icon && <Icon {...icon} />}
            <span className='text-nowrap'>{label}</span>
        </li>
    );
};

const MenuItem = ({ link, ...props }: MenuItemProps) => {
    if (link) {
        const { target = '_blank', ...rest } = link;
        return (
            <a
                target={target}
                onClick={(e) => e.stopPropagation()}
                {...rest}
            >
                <MenuItemComponent {...props} />
            </a>
        );
    }

    return <MenuItemComponent {...props} />;
};
