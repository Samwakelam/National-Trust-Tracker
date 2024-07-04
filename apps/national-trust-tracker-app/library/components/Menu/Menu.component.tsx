'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';

import { twMerge } from '../../utilities/twMerge.util';
import { isolateClickEvent } from '../../helpers/isolateClickEvent.helper';
import { LinkProps } from '../../types';

import { Icon, IconProps } from '../Icon';
import { Button } from '../Button';

import { MenuItemStyles, MenuStyles, menuItemStyles } from './Menu.styles';

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

export interface MenuItemProps extends MenuItemStyles {
    icon?: IconProps;
    label: string;
    onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    link?: LinkProps;
    isLoading?: boolean;
}

// MARK: Menu Item

const MenuItemComponent = ({
    onClick,
    label,
    icon,
    isLoading,
}: Omit<MenuItemProps, 'link'>) => {
    const styles = menuItemStyles({});

    return (
        <li
            data-label='menu-item'
            className={twMerge(styles)}
            onClick={isolateClickEvent(onClick)}
        >
            <span
                className={twMerge(
                    'flex flex-row gap-4 row-start-1 col-start-1 justify-center items-center text-nowrap',
                    isLoading && 'invisible cursor-not-allowed'
                )}
                aria-hidden={isLoading ? 'true' : 'false'}
            >
                {icon && <Icon {...icon} />}
                {label}
            </span>
            <span
                className={twMerge(
                    'flex-row row-start-1 col-start-1 justify-center',
                    !isLoading ? 'hidden' : 'flex'
                )}
                aria-hidden={!isLoading ? 'true' : 'false'}
            >
                <Icon
                    icon='spinner'
                    ariaLabel='loading spinner'
                    className={twMerge('animate-spin', icon?.className)}
                />
            </span>
        </li>
    );
};

const MenuItem = ({ link, ...props }: MenuItemProps) => {
    if (link) {
        const { target = '_blank', ...rest } = link;
        return (
            <Link
                target={target}
                onClick={(e) => e.stopPropagation()}
                {...rest}
            >
                <MenuItemComponent {...props} />
            </Link>
        );
    }

    return <MenuItemComponent {...props} />;
};
