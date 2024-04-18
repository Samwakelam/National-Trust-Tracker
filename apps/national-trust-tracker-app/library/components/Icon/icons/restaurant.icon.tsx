import React from 'react';
import { IconType } from 'react-icons';

import { createIcon } from '../createIcon.helper';

export const Restaurant = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'Restaurant',
    path: (
        <>
            <path d='M18.25 23.315v13.482c0 1.71.048 2.186 1.38 2.186 1.43 0 1.62-.475 1.62-2.233V23.315c0-1.158.532-1.75 1.022-2.268s.978-.925.978-1.297v-10h-1.5v7.75H20.5V9.75H19v7.75h-1.25V9.75h-1.5v10c0 .372.5.787.978 1.298s1.022 1.11 1.022 2.267zM29.25 27.39v10.29a1.25 1.25 0 001.25 1.342c.625 0 1.25-.43 1.25-1.342V11.115c0-1.433-1.1-2.148-2.25-2.148-1.103 0-2.25.715-2.25 2.148v15.417c0 .718.905 1 2 .858z'></path>
            <path d='M0 0v48h48V0zm45 45H3V3h42z'></path>
        </>
    ),
});
