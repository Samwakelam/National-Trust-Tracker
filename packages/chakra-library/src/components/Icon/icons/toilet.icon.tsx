import React from 'react';
import { createIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const Toilet = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'Toilet',
    path: (
        <>
            <path d='M33.43 34.25c4.592 0 5.57-3.72 5.57-8h-3.5c0 4.28-.938 5-2.223 5-1.48 0-2.22-1.06-2.22-7.045 0-5.595.395-7.593 2.17-7.593 1.58 0 2.075 1.218 2.075 4.138h3.555c0-2.92-.325-7-5.362-7-5.183 0-5.895 4.177-5.895 10.21.005 5.94.65 10.29 5.83 10.29zM16.027 33.75l1.91-14.25h.048l1.913 14.25h3.907l3.118-19.5h-3.345l-1.865 14.5h-.05l-2.01-14.5h-3.335l-2.01 14.5h-.05l-1.913-14.5H9l3.115 19.5z'></path>
            <path d='M0 0v48h48V0zm45 45H3V3h42z'></path>
        </>
    ),
}) as IconType;
