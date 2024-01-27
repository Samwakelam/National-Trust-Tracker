import React from 'react';
import { createIcon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const Map = createIcon({
    viewBox: '0 0 48 48',
    displayName: 'Map',
    path: (
        <>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0 48V0h48v48H0zm3-3h42V3H3v42zm27.809-10.5V10L38 13.5V38l-7.191-3.5zm-11.13-21L28.32 10v24.5L19.68 38V13.5zM10 34.5V10l7.191 3.5V38L10 34.5z'
                fill='#1F1F1F'
            ></path>
        </>
    ),
}) as IconType;
