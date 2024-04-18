import React from 'react';
import { IconType } from 'react-icons';

import { createIcon } from '../createIcon.helper';

export const Underground = createIcon({
    viewBox: '0 0 24 24',
    displayName: 'Underground',
    path: (
        <>
            <path d='M12 18.125c2.889 0 5.296-2.091 5.875-4.875H19.5v-2.5h-1.625C17.296 7.992 14.889 5.875 12 5.875S6.678 7.992 6.125 10.75H4.5v2.5h1.625c.553 2.784 2.986 4.875 5.875 4.875zM12 8a4.01 4.01 0 013.75 2.75h-7.5A4.011 4.011 0 0112 8zm3.75 5.25c-.5 1.601-2.018 2.883-3.75 2.883-1.71 0-3.25-1.282-3.75-2.883h7.5z'></path>
            <path d='M0 0v24h24V0H0zm22.5 22.5h-21v-21h21v21z'></path>
        </>
    ),
});
