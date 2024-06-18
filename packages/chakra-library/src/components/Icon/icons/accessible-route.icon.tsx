import React from 'react';
import { createIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const AccessibleRoute = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'AccessibleRoute',
    path: (
        <>
            <path d='M24 39l15-15L24 9v4.5H9v21h15z'></path>
            <path d='M0 0v48h48V0zm45 45H3V3h42z'></path>
        </>
    ),
}) as IconType;
