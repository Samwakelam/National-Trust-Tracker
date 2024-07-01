'use client';

import React, { ReactElement, createElement } from 'react';
import { twMerge } from 'tailwind-merge';

import {
    arrowsMap,
    chevronsMap,
    calendarsSolidMap,
    calendarsOutlineMap,
    circlesOutlineMap,
    circlesSolidMap,
    filesOutlineMap,
    filesSolidMap,
    heartsOutlineMap,
    heartsSolidMap,
    layersOutlineMap,
    layersSolidMap,
    locationOutlineMap,
    locationSolidMap,
    nationalTrustMap,
    shapesOutlineMap,
    shapesSolidMap,
    shieldsMap,
    symbolsOutlineMap,
    symbolsSolidMap,
    userOutlineMap,
    userSolidMap,
    utilsOutlineMap,
    utilsSolidMap,
} from './maps';

import { IconMapProps, IconProps } from './Icon.definition';

export const outlineIconMap: IconMapProps = {
    ...arrowsMap,
    ...calendarsOutlineMap,
    ...chevronsMap,
    ...circlesOutlineMap,
    ...filesOutlineMap,
    ...heartsOutlineMap,
    ...layersOutlineMap,
    ...locationOutlineMap,
    ...nationalTrustMap,
    ...shapesOutlineMap,
    ...symbolsOutlineMap,
    ...userOutlineMap,
    ...utilsOutlineMap,
    ...shieldsMap,
};

export const solidIconMap: IconMapProps = {
    ...arrowsMap,
    ...calendarsSolidMap,
    ...chevronsMap,
    ...circlesSolidMap,
    ...filesSolidMap,
    ...heartsSolidMap,
    ...layersSolidMap,
    ...locationSolidMap,
    ...nationalTrustMap,
    ...shapesSolidMap,
    ...symbolsSolidMap,
    ...userSolidMap,
    ...utilsSolidMap,
    ...shieldsMap,
};

export const Icon = ({
    ariaLabel,
    icon,
    variant = 'solid',
    onMouseOut,
    onMouseOver,
    className,
}: IconProps): ReactElement<IconProps> => {
    const prefix = icon.split('-')[0];
    const customIconPrefixes = ['nt'];
    const isCustomIcon = customIconPrefixes.includes(prefix!);

    return (
        <i
            aria-label={ariaLabel}
            data-label='icon'
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            className={twMerge(
                'inline-block [&>svg]:w-full [&>svg]:h-full w-20 h-20',
                className,
                isCustomIcon && '[&>svg]:fill-current',
                !isCustomIcon && '[&>svg]:stroke-current'
            )}
        >
            {isCustomIcon &&
                (variant === 'solid'
                    ? solidIconMap[icon]
                    : outlineIconMap[icon])}

            {!isCustomIcon &&
                (variant === 'solid'
                    ? createElement(solidIconMap[icon])
                    : createElement(outlineIconMap[icon]))}
        </i>
    );
};
