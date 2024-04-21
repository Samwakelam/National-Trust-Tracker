'use client';

import { useEffect, useMemo, useState } from 'react';
// import { useForm } from 'react-hook-form';

import { useVisits } from '../../../library/context/Visits.context';
import { Membership, Person } from '../../../library/types/internal';
import { useStatisticsCharts } from './useStatisticsCharts.hook';
import { Button, Card, Frame, IconProps } from '../../../library/components';
import { Tile } from '../../../library/components/Tile/Tile.component';
import { getCase, resolveIcon } from '../../../library/helpers';

export type StatisticsViewProps = {
    membership: Membership;
};

type FavouritesState = {
    place: string;
    travel: string;
    people: (Person & { visits: number })[];
    region: string;
};

export const StatisticsView = ({ membership }: StatisticsViewProps) => {
    const { visits } = useVisits();

    return (
        <div
            data-label='statistics-view'
            className=''
        ></div>
    );
};

// data-label='' className=''

const getAssetsIcon = (key: string): IconProps => {
    switch (key) {
        case 'café':
            return {
                icon: 'nt-cafe',
                ariaLabel: 'cafe',
            };
        case 'castle':
            return {
                icon: 'castle',
                variant: 'outline',
                ariaLabel: 'castle',
            };
        case 'courtyard-kitchen':
            return {
                icon: 'cook-pot',
                variant: 'outline',
                ariaLabel: 'kitchen',
            };
        case 'garden':
            return {
                icon: 'flower',
                variant: 'outline',
                ariaLabel: 'flower',
            };
        case 'gardens':
            return {
                icon: 'nt',
                ariaLabel: 'national trust',
            };

        case 'park':
            return {
                icon: 'tree',
                variant: 'outline',
                ariaLabel: 'park',
            };
        case 'restaurant':
            return {
                icon: 'nt-restaurant',
                ariaLabel: 'restaurant',
            };
        case 'shop':
            return {
                icon: 'nt-shop',
                ariaLabel: 'shop',
            };
        case 'tea-room':
            return {
                icon: 'coffee',
                variant: 'outline',
                ariaLabel: 'coffee cup',
            };
        case 'woodland':
            return {
                icon: 'tree-pine',
                variant: 'outline',
                ariaLabel: 'woodland',
            };
        default:
            return {
                icon: 'house',
                variant: 'outline',
                ariaLabel: 'house',
            };
    }
};
