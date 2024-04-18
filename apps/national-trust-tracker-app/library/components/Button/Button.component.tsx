'use client';

import React, { ReactNode } from 'react';

export type ButtonProps = {
    children?: ReactNode;
    form?: string;
    isDisabled?: boolean;
    name?: string;
    onClick?: () => void;
    type?: 'button' | 'reset' | 'submit';
};

export const Button = ({
    children,
    form,
    isDisabled,
    name,
    onClick,
    type = 'button',
}: ButtonProps) => {
    return (
        <button
            className='h-40 py-0 px-24 capitalize bg-pink-200 border-0  rounded-[24px]'
            onClick={onClick}
            disabled={isDisabled}
            form={form}
            type={type}
            name={name}
        >
            {children}
        </button>
    );
};
