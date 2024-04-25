'use client';

import React from 'react';

import { Drawer, DrawerProps } from '../../../../../library/components/Drawer';
import { Place } from '../../../../../library/types/national-trust';
import { PlaceViewProps } from './Place.definition';

interface DrawerLogVisitProps extends Pick<DrawerProps, 'onClose' | 'isOpen'> {
    place: Pick<
        PlaceViewProps,
        | 'place'
        | 'opening'
        | 'facilities'
        | 'admissionPrices'
        | 'directions'
        | 'accessTags'
    >;
}

export const DrawerAddVisit = ({
    isOpen,
    onClose,
    place,
}: DrawerAddVisitProps) => {
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
