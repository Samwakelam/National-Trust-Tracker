import React, { ReactElement } from 'react';
import clsx from 'clsx';

import { Button, ButtonProps } from '../Button';
import { Menu, MenuProps } from '../Menu';
import { Icon, IconProps } from '../Icon';
import { Tag, TagProps } from '../Tag';
import { ClickEvent } from '../../types';

interface IndicatorIconProps extends IconProps {
    type: 'icon';
    id: string;
}

interface IndicatorTagProps extends TagProps {
    type: 'tag';
    id: string;
}

export type IndicatorProps = IndicatorIconProps | IndicatorTagProps;

type CardComponentProps = {
    children?: ReactElement | ReactElement[] | null;
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    heading?: string;
    image?: {
        src: string;
        alt: string;
    };
    indicators?: IndicatorProps[];
    layout?: 'horizontal' | 'vertical';
    menu?: MenuProps;
    onClick?: (e: ClickEvent) => void;
};

export interface CardProps extends CardComponentProps {
    preset?: 'quartered';
}

export const Card = ({ preset, ...props }: CardProps) => {
    switch (preset) {
        default:
            return <CardComponent {...props} />;
    }
};

export const CardComponent = ({
    children,
    confirmCTA,
    declineCTA,
    heading,
    image,
    indicators,
    layout = 'vertical',
    menu,
    onClick,
}: CardComponentProps): ReactElement<CardComponentProps> => {
    return (
        <article
            data-label='card'
            className={clsx(
                'flex p-16 bg-pink-100 rounded-12',
                layout === 'vertical' ? 'flex-col' : 'flex-col sm:flex-row',
                onClick ? 'cursor-pointer' : 'cursor-default'
            )}
            onClick={onClick}
        >
            <div
                data-label='card-image'
                className='flex flex-1 w-full h-full'
            >
                <img
                    data-label='card-image'
                    className={clsx(
                        'object-cover  h-full w-full',
                        layout === 'vertical'
                            ? `rounded-t-6 rounded-b-0`
                            : `rounded-t-6 rounded-b-0 sm:rounded-l-6 sm:rounded-r-0`
                    )}
                    {...image}
                />
            </div>
            <div
                data-label='card-content'
                className={clsx(
                    'flex flex-col flex-2',
                    layout === 'vertical' ? 'py-16' : 'py-16 sm:py-0 sm:pl-16'
                )}
            >
                <header
                    data-label='card-header'
                    className='w-full flex justify-between items-center g-24'
                >
                    <h3 className='font-bold capitalised'>{heading}</h3>
                    {menu && (
                        <Menu
                            align='right'
                            {...menu}
                        />
                    )}
                </header>
                <div
                    data-label='card-body'
                    className='w-full py-16 h-full flex flex-col gap-16'
                >
                    {children}
                </div>
                <footer
                    data-label='card-footer'
                    className='flex flex-col sm:flex-row gap-16 justify-end items-center'
                >
                    {indicators && (
                        <div className='flex flex-row w-full items-center gap-8'>
                            {indicators.map(indicatorMap)}
                        </div>
                    )}
                    <div className='flex flex-row gap-16 w-full justify-end'>
                        {declineCTA && <Button {...declineCTA} />}
                        {confirmCTA && <Button {...confirmCTA} />}
                    </div>
                </footer>
            </div>
        </article>
    );
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
