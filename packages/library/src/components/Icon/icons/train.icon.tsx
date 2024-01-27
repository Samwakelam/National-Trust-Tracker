import React from 'react';
import { createIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const Train = createIcon({
    viewBox: '0 0 24 24',
    displayName: 'Train',
    path: (
        <>
            <path d='M24 24H0V0h24v24zm-1.478-1.498V1.498H1.478v21.004h21.044zm-2.116-11.163h-4.667l-3.97 2.086h8.55v1.704h-8.55l5.593 2.526h-4l-5.217-2.527H3.623v-1.703h4.522l4.203-2.086H3.652V9.606h8.58L6.58 7.08h4.029l5.246 2.526h4.55v1.733z'></path>
        </>
    ),
}) as IconType;
