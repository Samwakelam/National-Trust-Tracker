import React from 'react';
import { createIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const Braille = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'Braille',
    path: (
        <>
            <path d='M33 38.75a5.75 5.75 0 10-5.75-5.777A5.802 5.802 0 0033 38.75zM33.027 20.75a5.75 5.75 0 10-5.777-5.723 5.793 5.793 0 005.777 5.723zM14.97 38.75a5.75 5.75 0 100-11.5 5.75 5.75 0 000 11.5z'></path>
            <path d='M0 0v48h48V0zm45 45H3V3h42z'></path>
        </>
    ),
}) as IconType;
