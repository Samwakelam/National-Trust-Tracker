'use client';

import clsx from 'clsx';
import React, { ReactElement, useState } from 'react';
import { Button } from '../Button';

type MenuProps = {
    menuItems: MenuItemProps[];
};

type MenuItemProps = {
    onClick?: () => void;
};

export const Menu = ({ menuItems }: MenuProps): ReactElement<MenuProps> => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div
            data-label='menu'
            className='inline-block relative bg-teal-100'
        >
            <Button
                data-label='menu-button'
                onClick={() => setIsOpen(!isOpen)}
            >
                Menu
            </Button>
            <div
                data-label='menu-content'
                className={clsx(
                    'absolute min-w-120 z-1 flex flex-col gap-2',
                    isOpen ? 'flex' : 'hidden'
                )}
            >
                {Array.from({ length: 3 }, (item, index) => (
                    <MenuItem key={index} />
                ))}
            </div>
        </div>
    );
};

const MenuItem = ({ onClick }: MenuItemProps) => {
    return (
        <a
            data-label='menu-item'
            className='bg-teal-300 py-12 px-16  first:rounded-t-8 first:rounded-b-0 last:rounded-b-8 last:rounded-t-0 hover:bg-teal-200'
            onClick={onClick}
        >
            Menu Item
        </a>
    );
};
