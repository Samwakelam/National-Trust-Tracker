import React, { ReactElement } from 'react';

import * as Chakra from '@chakra-ui/react';

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
    ...props
}: IconProps): ReactElement<IconProps> => {
    return (
        <Chakra.Icon
            as={variant === 'solid' ? solidIconMap[icon] : outlineIconMap[icon]}
            aria-label={ariaLabel}
            data-label='icon'
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            {...props}
        />
    );
};
