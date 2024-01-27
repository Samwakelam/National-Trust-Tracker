import React from 'react';
import { createIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const Shop = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'Shop',
    path: (
        <>
            <path d='M37.5 37.5V15l-1.91-1.5h-5.84c0-3.735-3.082-6-6.75-6-3.92 0-6.375 2.465-6.817 6H10.5v21.957l3.528 2.043zM23.19 9.773c2.89 0 3.872 1.987 4.117 3.727h-8.675c.59-2.038 1.963-3.728 4.558-3.728zM13.5 16.25h2.75v3.25h2.25v-3.25h9v3.25h2.25v-3.25h2.75V33h-19z'></path>
            <path d='M0 0v48h48V0zm45 45H3V3h42z'></path>
        </>
    ),
}) as IconType;
