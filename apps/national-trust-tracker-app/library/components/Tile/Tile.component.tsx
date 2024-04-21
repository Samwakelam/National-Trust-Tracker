import React, { ReactElement } from 'react';
import clsx from 'clsx';

import { Button, ButtonProps } from '../Button';
import { Icon, IconProps } from '../Icon';
import { ClickEvent } from '../../types';

type TileComponentProps = {
    className?: string;
    cta?: ButtonProps;
    description?: string;
    heading?: string;
    icon: IconProps;
    onClick?: (e: ClickEvent) => void;
};

export interface TileProps extends TileComponentProps {
    preset?: 'quartered';
}

export const Tile = ({ preset, ...props }: TileProps) => {
    switch (preset) {
        default:
            return <TileComponent {...props} />;
    }
};

export const TileComponent = ({
    className,
    cta,
    description,
    heading,
    icon,
    onClick,
}: TileComponentProps): ReactElement<TileComponentProps> => {
    return (
        <article
            data-label='tile'
            className={clsx(
                'flex bg-pink-100 rounded-12 flex-col aspect-3/4 w-fit justify-center',
                className,
                onClick ? 'cursor-pointer' : 'cursor-default'
            )}
            onClick={onClick}
        >
            <section className='flex flex-col flex-1 px-16 py-20 gap-8 items-center'>
                {heading && (
                    <header
                        data-label='tile-header'
                        className='w-full flex flex-row justify-center mx-[-16px]'
                    >
                        <h6 className='font-bold capitalised max-w-112 text-center'>
                            {heading}
                        </h6>
                    </header>
                )}
                <div
                    data-label='tile-body'
                    className='w-full h-full flex flex-col items-center justify-center gap-16'
                >
                    <Icon
                        {...icon}
                        className='w-48 h-48'
                    />
                    {description && (
                        <p className='max-w-112 text-center'>{description}</p>
                    )}
                </div>
            </section>
            <footer
                data-label='tile-footer'
                className='flex flex-row justify-end items-center'
            >
                {cta && (
                    <Button
                        {...cta}
                        className='rounded-t-0 rounded-b-12 w-full'
                    />
                )}
            </footer>
        </article>
    );
};
