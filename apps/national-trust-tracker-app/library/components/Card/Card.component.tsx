import React, { ReactElement, ReactNode } from 'react';

import { twMerge } from '../../utilities/twMerge.util';
import { ClickEvent } from '../../types';

// MARK: Component imports
import { Button, ButtonProps } from '../Button';
import { Menu, MenuProps } from '../Menu';
import { Icon, IconProps } from '../Icon';
import { Badge, BadgeProps } from '../Badge';

import { CardStyles, useCardStyles } from './Card.styles';

// MARK: Types

interface IndicatorIconProps extends IconProps {
    type: 'icon';
    id: string;
}

interface IndicatorBadgeProps extends BadgeProps {
    type: 'badge';
    id: string;
}

export type IndicatorProps = IndicatorIconProps | IndicatorBadgeProps;

export type Children =
    | ReactElement
    | (ReactElement | ReactElement[] | undefined | false | null)[]
    | false
    | null;

interface CardComponentProps extends CardStyles {
    children?: ReactNode;
    className?: string;
    confirmCTA?: ButtonProps;
    declineCTA?: ButtonProps;
    detail?: ReactElement;
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

export const Card = ({ preset, children, heading, ...props }: CardProps) => {
    switch (preset) {
        case 'quartered':
            return (
                <CardComponent {...props}>
                    <h3 className='w-full font-extrabold capitalize text-center '>
                        {heading}
                    </h3>
                    <div className='h-2 w-full bg-black-100' />
                    <div className='grid gap-16 grid-cols-2 grid-rows-2 h-full'>
                        {children}
                    </div>
                </CardComponent>
            );
        default:
            return (
                <CardComponent
                    heading={heading}
                    {...props}
                >
                    {children}
                </CardComponent>
            );
    }
};

// MARK: Card Component

export const CardComponent = ({
    children,
    className,
    colorScheme,
    confirmCTA,
    declineCTA,
    design,
    detail,
    direction,
    divergent,
    heading,
    image,
    indicators,
    menu,
    onClick,
    size,
}: CardComponentProps): ReactElement<CardComponentProps> => {
    const { card, img, bubble } = useCardStyles({
        design,
        direction,
        divergent,
        size,
        colorScheme,
    });

    // MARK: Return

    return (
        <article
            data-label='card-container'
            className={twMerge(
                detail
                    ? 'grid grid-cols-1 grid-rows-[auto_16px_auto]'
                    : 'flex flex-row',
                className
            )}
        >
            {detail && (
                <section
                    data-label='bubble-detail'
                    className={twMerge(bubble())}
                >
                    {detail}
                </section>
            )}
            <section
                data-label='card'
                className={twMerge(
                    card(
                        twMerge(
                            detail ? 'row-start-2 row-span-2 col-start-1' : '',
                            onClick ? 'cursor-pointer' : 'cursor-default',
                            className
                        )
                    )
                )}
                onClick={onClick}
            >
                {/* MARK: Image
                 */}

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
                    {/* MARK: Header
                     */}
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

                    {/* MARK: Body
                     */}

                    <div
                        data-label='card-body'
                        className='w-full py-16 h-full flex flex-col gap-16'
                    >
                        {children}
                    </div>

                    {/* MARK: Footer
                     */}

                    <footer
                        data-label='card-footer'
                        className='flex flex-col lg:flex-row gap-16 justify-end items-center'
                    >
                        {indicators && (
                            <div className='flex flex-row flex-wrap w-full items-center gap-8'>
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
            </section>
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
        <Badge
            key={indicator.id}
            {...indicator}
        />
    );
};

// MARK: Resolve Functions

const resolveConfirmCTADivergent = (
    divergent: CardProps['divergent']
): ButtonProps['divergent'] => {
    switch (divergent) {
        case 'outline':
            return 'outline';
        case 'solidOutline':
            return 'solid';
        case 'solid':
            return 'solid';
    }
};

const resolveDeclineCTADivergent = (
    divergent: CardProps['divergent']
): ButtonProps['divergent'] => {
    switch (divergent) {
        case 'outline':
            return 'ghost';
        case 'solidOutline':
            return 'outline';
        case 'solid':
            return 'outline';
    }
};
