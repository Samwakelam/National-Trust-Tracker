'use client';

import React from 'react';
import { Drawer, DrawerProps } from '../../../../../library/components/Drawer';

type DrawerAddVisitProps = Pick<DrawerProps, 'isOpen' | 'onClose'>;

export const DrawerAddVisit = ({ isOpen, onClose }: DrawerAddVisitProps) => {
    return (
        <Drawer
            onClose={onClose}
            isOpen={isOpen}
            confirmCTA={{}}
            declineCTA={{}}
            heading='Log A Visit'
        ></Drawer>
    );
};
