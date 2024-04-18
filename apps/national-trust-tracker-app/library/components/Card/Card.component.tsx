import React, { ReactElement, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Button, ButtonProps } from '../Button';

type CardVariant =
    | 'horizontal'
    | 'vertical'
    | 'outline'
    | 'filled'
    | 'elevated';

export type CardProps = {
    children?: ReactElement | ReactElement[] | null;
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    footer?: string;
    heading?: string;
    image?: {
        src: string;
        alt: string;
    };
    variant?: CardVariant[];
};

export const Card = ({
    children,
    confirmCTA,
    declineCTA,
    footer,
    heading,
    image,
    variant = ['vertical'],
}: CardProps): ReactElement<CardProps> => {
    return (
        <article
            data-label='card'
            className={clsx(
                'flex  gap-16 bg-pink-100 p-16',
                resolveContainerClasses(variant)
            )}
        >
            <div
                data-label='card-image'
                className={`flex w-full h-full`}
            >
                <img
                    data-label='card-image'
                    className={clsx(
                        'object-cover bg-blue-300 h-full w-full',
                        resolveImageClasses(variant)
                    )}
                    {...image}
                />
            </div>
            <div
                data-label='card-content'
                className='bg-blue-200 flex flex-col'
            >
                <header
                    data-label='card-header'
                    className='bg-pink-300 w-full flex justify-between px-16 pt-16 pb-0 g-24'
                >
                    {heading}
                </header>
                <div
                    data-label='card-body'
                    className='bg-pink-400 w-full p-16 h-full flex flex-col gap-16'
                >
                    {children}
                </div>
                <footer
                    data-label='card-footer'
                    className='flex gap-16 pt-0 px-16 pb-16 justify-end items-center '
                >
                    {declineCTA && <Button {...declineCTA} />}
                    {confirmCTA && <Button {...confirmCTA} />}
                </footer>
            </div>
        </article>
    );
};

const resolveContainerClasses = (variant: CardVariant[]) => {
    return variant.reduce((prev: string, current: CardVariant) => {
        switch (current) {
            case 'horizontal':
                prev += 'flex-row';
                break;
            case 'vertical':
                prev += 'flex-col';
                break;
        }
        return prev;
    }, '');
};

const resolveImageClasses = (variant: CardVariant[]) => {
    return variant.reduce((prev: string, current: CardVariant) => {
        switch (current) {
            case 'horizontal':
                prev += `rounded-l-[6px] rounded-r-[0]`;
                break;
            case 'vertical':
                prev += `rounded-t-[6px] rounded-b-[0]`;
                break;
        }
        return prev;
    }, '');
};
