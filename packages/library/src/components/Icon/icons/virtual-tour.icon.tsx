import React from 'react';
import { createIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const VirtualTour = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'VirtualTour',
    path: (
        <>
            <path d='M18.715 26.505l-2.3-8.005h-2.35L17.538 30h2.547l3.473-11.5h-2.495zM24.5 20.5h3V30H30v-9.5h3v-2h-8.5z'></path>
            <path d='M39 12H9v24h30zm-3.265 20.777s-5.965.473-11.54.473c-5.675 0-11.738-.482-11.738-.482s-.92-4.716-.92-8.56c0-4.233.438-8.56.438-8.56s5.963-.628 11.977-.628c5.818 0 12.075.627 12.075.627s.438 3.173.438 8.56c0 5.25-.73 8.57-.73 8.57z'></path>
            <path d='M0 0v48h48V0zm45 45H3V3h42z'></path>
        </>
    ),
}) as IconType;
