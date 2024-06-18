import React from 'react';
import { createIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const CarPark = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'CarPark',
    path: (
        <>
            <path d='M21.75 28.5c7.192.048 14.25-2.88 14.25-9.787C36 10.856 33.792 9 21.75 9H14v30h7.75zm0-14.25c2.635-.287 7.5.13 7.5 3.75 0 3.047-4.112 4-7.5 4z'></path>
            <path d='M0 0v48h48V0zm45 45H3V3h42z'></path>
        </>
    ),
}) as IconType;
