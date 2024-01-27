import React from 'react';
import { createIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const LargePrint = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'LargePrint',
    path: (
        <>
            <path d='M21 27.25h6l1 3.5h3l-5.25-15h-3.5l-5.25 15h3zm3-7.75l2 5.5h-4z'></path>
            <path d='M0 0v48h48V0zm45 45H6.75l8.268-9A14.59 14.59 0 0024 39c8.25 0 14.953-6.75 14.953-15.033S32.25 8.944 24 8.944A15.06 15.06 0 0011.69 32.61L3 42V3h42zM12.678 23.975A11.323 11.323 0 1124 35.313a11.36 11.36 0 01-11.322-11.338z'></path>
        </>
    ),
}) as IconType;
