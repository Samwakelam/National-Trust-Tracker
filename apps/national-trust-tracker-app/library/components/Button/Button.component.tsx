'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';

import { ClickEvent } from '../../types';
import { twMerge } from '../../utilities/twMerge.util';
import { Icon, IconProps } from '../Icon';

import { ButtonStyles, useButtonStyles } from './Button.styles';

// MARK: Types

interface ButtonIconProps extends IconProps {
    position?: 'left' | 'right';
}

export interface ButtonProps extends Omit<ButtonStyles, 'iconButton'> {
    children?: ReactNode;
    className?: string;
    form?: string;
    icon?: ButtonIconProps;
    isActive?: boolean;
    isDisabled?: boolean;
    name?: string;
    onClick?: (e: ClickEvent) => void;
    type?: 'button' | 'reset' | 'submit';
}

// MARK: Button
export const Button = ({
    children,
    className,
    colorScheme,
    design,
    divergent,
    form,
    icon,
    isActive,
    isDisabled,
    isLoading,
    name,
    onClick,
    size,
    type = 'button',
}: ButtonProps) => {
    const { button, icon: iconStyles } = useButtonStyles({
        design,
        divergent,
        size,
        colorScheme,
        iconButton: !children && !!icon,
        isLoading,
    });

    // MARK: Return

    return (
        <button
            className={twMerge(button(className))}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(e);
            }}
            disabled={isDisabled}
            form={form}
            type={type}
            name={name}
            data-active={isActive}
        >
            <span
                className={twMerge(
                    'flex flex-row gap-4 row-start-1 col-start-1 justify-center items-center',
                    isLoading && 'invisible cursor-not-allowed'
                )}
                aria-hidden={isLoading ? 'true' : 'false'}
            >
                {icon && icon.position !== 'right' && (
                    <Icon
                        {...icon}
                        className={twMerge(iconStyles(icon.className))}
                    />
                )}
                {children}
                {icon && icon.position === 'right' && (
                    <Icon
                        {...icon}
                        className={twMerge(iconStyles(icon.className))}
                    />
                )}
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
                    className={twMerge(
                        iconStyles(twMerge('animate-spin', icon?.className))
                    )}
                />
            </span>
        </button>
    );
};
