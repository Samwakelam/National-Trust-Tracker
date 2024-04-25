import React, { ReactElement } from 'react';

import { ClickEvent } from '../../types';

import { Button, ButtonProps } from '../Button';
import { Icon, IconProps } from '../Icon';

import { TileStyles, tileStyles } from './Tile.styles';
import { twMerge } from '../../utilities/twMerge.util';

// MARK: Types

interface TileComponentProps extends TileStyles {
    className?: string;
    cta?: ButtonProps;
    description?: string;
    heading?: string;
    icon: IconProps;
    onClick?: (e: ClickEvent) => void;
}

export interface TileProps extends TileComponentProps {
    preset?: 'quartered';
}

// MARK: Tile

export const Tile = ({ preset, ...props }: TileProps) => {
    switch (preset) {
        default:
            return <TileComponent {...props} />;
    }
};

// MARK: Tile Component

export const TileComponent = ({
    className,
    colorScheme,
    cta,
    description,
    divergent,
    heading,
    icon,
    onClick,
    size,
}: TileComponentProps): ReactElement<TileComponentProps> => {
    const styles = tileStyles({
        className: twMerge(
            onClick ? 'cursor-pointer' : 'cursor-default',
            className
        ),
        colorScheme,
        divergent,
    });

    // MARK: Return

    return (
        <article
            data-label='tile'
            className={twMerge(styles)}
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
                        colorScheme={colorScheme}
                        {...cta}
                        className='rounded-t-0 rounded-b-12 w-full text-[--color-700]'
                    />
                )}
            </footer>
        </article>
    );
};
