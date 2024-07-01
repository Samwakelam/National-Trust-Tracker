import React from 'react';
import { IconType } from 'react-icons';

import { createIcon } from '../createIcon.helper';

export const GuidedTour = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'GuidedTour',
    path: (
        <>
            <path d='M21.25 15.37a3.06 3.06 0 10-3.105-3.058 3.085 3.085 0 003.105 3.058z'></path>
            <path d='M20.5 29.5h1v8.25h3.75V19.5l9.25-6c1.198-.735.7-.853.25-2 1-.75 1.5-1.085 1.137-1.637-.552-.873-.83-.138-1.52.137L24.25 16.25H18l-1.5 2V29.5L12 37.75h4.25z'></path>
            <path d='M0 0v48h48V0zm45 45H3V3h42z'></path>
        </>
    ),
});
