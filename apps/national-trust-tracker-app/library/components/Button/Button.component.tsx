'use client';

import React, { ReactNode } from 'react';

import { Icon, IconProps } from '../Icon';
import clsx from 'clsx';

interface ButtonIconProps extends IconProps {
    position?: 'left' | 'right';
}

export type ButtonProps = {
    children?: ReactNode;
    className?: string;
    form?: string;
    icon?: ButtonIconProps;
    isDisabled?: boolean;
    name?: string;
    onClick?: () => void;
    type?: 'button' | 'reset' | 'submit';
};

export const Button = ({
    children,
    className,
    form,
    icon,
    isDisabled,
    name,
    onClick,
    type = 'button',
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                'h-40 py-0  capitalize bg-pink-200 border-0 rounded-[24px] flex flex-row gap-4 justify-center items-center',
                children && 'px-24',
                !children && icon && 'w-40 px-0',
                className
            )}
            onClick={onClick}
            disabled={isDisabled}
            form={form}
            type={type}
            name={name}
        >
            {icon && icon.position !== 'right' && <Icon {...icon} />}
            {children}
            {icon && icon.position === 'right' && <Icon {...icon} />}
        </button>
    );
};
