import React, { ReactElement } from 'react';
import clsx from 'clsx';

import { twMerge } from '../../utilities/twMerge.util';
import { ClickEvent } from '../../types';

// MARK: Component imports
import { Button, ButtonProps } from '../Button';
import { Menu, MenuProps } from '../Menu';
import { Icon, IconProps } from '../Icon';
import { Tag, TagProps } from '../Tag';

import { CardStyles, useCardStyles } from './Card.Styles';

// MARK: Types
interface IndicatorIconProps extends IconProps {
    type: 'icon';
    id: string;
}

interface IndicatorTagProps extends TagProps {
    type: 'tag';
    id: string;
}

export type IndicatorProps = IndicatorIconProps | IndicatorTagProps;

interface CardComponentProps extends CardStyles {
    children?: ReactElement | ReactElement[] | null;
    className?: string;
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    heading?: string;
    image?: {
        src: string;
        alt: string;
    };
    indicators?: IndicatorProps[];
    menu?: MenuProps;
    onClick?: (e: ClickEvent) => void;
}

export interface CardProps extends CardComponentProps {
    preset?: 'quartered';
}

// MARK: Card

export const Card = ({ preset, ...props }: CardProps) => {
    switch (preset) {
        default:
            return <CardComponent {...props} />;
    }
};

// MARK: CardComponent
export const CardComponent = ({
    children,
    className,
    colorScheme,
    confirmCTA,
    declineCTA,
    design,
    direction,
    divergent,
    heading,
    image,
    indicators,
    menu,
    onClick,
    size,
}: CardComponentProps): ReactElement<CardComponentProps> => {
    const { card, img } = useCardStyles({
        design,
        direction,
        divergent,
        size,
        colorScheme,
    });

    // MARK: Return
    return (
        <article
            data-label='card'
            className={twMerge(
                card(
                    twMerge(
                        onClick ? 'cursor-pointer' : 'cursor-default',
                        className
                    )
                )
            )}
            onClick={onClick}
        >
            {/* MARK: Image */}
            {image && (
                <div
                    data-label='card-image'
                    className={twMerge(img())}
                >
                    <img
                        data-label='card-image'
                        className='object-cover h-full w-full'
                        {...image}
                    />
                </div>
            )}
            <div
                data-label='card-content'
                className='flex flex-col flex-2'
            >
                {/* MARK: Header */}
                <header
                    data-label='card-header'
                    className='w-full flex justify-between items-center g-24'
                >
                    {heading && (
                        <h3 className='font-bold capitalised'>{heading}</h3>
                    )}
                    {menu && (
                        <Menu
                            align='right'
                            {...menu}
                        />
                    )}
                </header>
                {/* MARK: Body */}
                <div
                    data-label='card-body'
                    className='w-full py-16 h-full flex flex-col gap-16'
                >
                    {children}
                </div>
                {/* MARK: Footer */}
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
                        {declineCTA && (
                            <Button
                                divergent={resolveDeclineCTADivergent(
                                    divergent
                                )}
                                colorScheme='red'
                                {...declineCTA}
                            />
                        )}
                        {confirmCTA && (
                            <Button
                                divergent={resolveConfirmCTADivergent(
                                    divergent
                                )}
                                colorScheme={colorScheme}
                                {...confirmCTA}
                            />
                        )}
                    </div>
                </footer>
            </div>
        </article>
    );
};

// MARK: indicatorMap
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

// MARK: Resolve Functions

const resolveConfirmCTADivergent = (
    divergent: ButtonProps['divergent']
): ButtonProps['divergent'] => {
    switch (divergent) {
        case 'ghost':
            return 'ghost';
        case 'outline':
            return 'outline';
        case 'soft':
            return 'solid';
        case 'solid':
            return 'solid';
    }
};

const resolveDeclineCTADivergent = (
    divergent: ButtonProps['divergent']
): ButtonProps['divergent'] => {
    switch (divergent) {
        case 'ghost':
            return 'ghost';
        case 'outline':
            return 'ghost';
        case 'soft':
            return 'outline';
        case 'solid':
            return 'outline';
    }
};
