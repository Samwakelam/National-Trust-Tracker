import React, { ReactElement, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Button, ButtonProps } from '../Button';
import { Menu, MenuProps } from '../Menu';
import { Icon, IconProps } from '../Icon';
import { Tag, TagProps } from '../Tag';

type CardVariant =
    | 'horizontal'
    | 'vertical'
    | 'outline'
    | 'filled'
    | 'elevated';

interface IndicatorIconProps extends IconProps {
    type: 'icon';
    id: string;
}

interface IndicatorTagProps extends TagProps {
    type: 'tag';
    id: string;
}

export type IndicatorProps = IndicatorIconProps | IndicatorTagProps;

export type CardProps = {
    children?: ReactElement | ReactElement[] | null;
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    heading?: string;
    image?: {
        src: string;
        alt: string;
    };
    indicators?: IndicatorProps[];
    menu?: MenuProps;
    variant?: CardVariant[];
};

export const Card = ({
    children,
    confirmCTA,
    declineCTA,
    heading,
    image,
    indicators,
    menu,
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
                    className='bg-pink-300 w-full flex justify-between items-center px-16 pt-16 pb-0 g-24'
                >
                    {heading}
                    {menu && (
                        <Menu
                            align='right'
                            {...menu}
                        />
                    )}
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
                    {indicators && (
                        <div className='flex flex-row items-center gap-8'>
                            {indicators.map(indicatorMap)}
                        </div>
                    )}
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

const indicatorMap = (indicator: IndicatorProps) => {
    if (indicator.type === 'icon') {
        return (
            <Icon
                key={indicator.id}
                {...indicator}
            />
        );
    }

    return (
        <Tag
            key={indicator.id}
            {...indicator}
        />
    );
};
