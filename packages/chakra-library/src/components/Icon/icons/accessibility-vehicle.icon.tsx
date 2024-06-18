import React from 'react';
import { createIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const AccessibleVehicle = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'AccessibleVehicle',
    path: (
        <>
            <path d='M15.5 34.5a3 3 0 100-6 3 3 0 000 6z'></path>
            <path d='M10.393 30.5h.107a5 5 0 1110 0v.25h7.775v-.25a4.956 4.956 0 015-5c2.75 0 4.945 2 5 4.75.228-.158.75-.5.75-1.155v-4.707c0-.466-.5-1.138-1.06-1.138H33.75v-2.5h3l1-8.25H36c-.61 2.103-1.5 3.797-1.75 6L28 17.75v3h3.5v2.485c-1.665 0-4.302-.355-4.25 2.027v2.75h-6v-2.657c0-1.125-.295-2.105-1.325-2.105H17l.25-1.25 7-7.5-1.5-1.75-7 8.5-.5 2h-3.395c-3.177 0-2.825 2.92-2.825 5.235 0 .765.403 2.015 1.363 2.015z'></path>
            <path d='M33.5 28.5a3 3 0 103 3 2.971 2.971 0 00-3-3z'></path>
            <path d='M0 0v48h48V0zm45 45H3V3h42z'></path>
        </>
    ),
}) as IconType;
