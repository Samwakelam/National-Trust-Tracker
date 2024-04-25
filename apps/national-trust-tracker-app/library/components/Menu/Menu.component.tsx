'use client';

import clsx from 'clsx';
import React, { ReactElement, useState } from 'react';

import { Button } from '../Button';
import { Icon, IconProps } from '../Icon';

// MARK: Types

export type MenuProps = {
    menuItems: MenuItemProps[];
    align?: 'left' | 'right';
};

export type MenuItemProps = {
    label: string;
    icon?: IconProps;
    onClick?: () => void;
};

// MARK: Menu
export const Menu = ({
    menuItems,
    align = 'left',
}: MenuProps): ReactElement<MenuProps> => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // MARK: Return

    return (
        <div
            data-label='menu'
            className='inline-block relative'
        >
            <Button
                divergent='ghost'
                data-label='menu-button'
                onClick={() => setIsOpen(!isOpen)}
                icon={{ icon: 'menu-dots-v', ariaLabel: 'menu' }}
            />
            <ul
                data-label='menu-content'
                className={clsx(
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

// MARK: Menu Item
const MenuItem = ({ onClick, label, icon }: MenuItemProps) => {
    return (
        <li
            data-label='menu-item'
            className='bg-teal-300 py-12 px-16  first:rounded-t-8 first:rounded-b-0 last:rounded-b-8 last:rounded-t-0 hover:bg-teal-200 flex flex-row flex-nowrap items-center gap-8'
            onClick={onClick}
        >
            {icon && <Icon {...icon} />}
            <span className='text-nowrap'>{label}</span>
        </li>
    );
};
