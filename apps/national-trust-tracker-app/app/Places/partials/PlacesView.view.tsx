'use client';

import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';

import { PlaceSummary } from '../../../library/types/national-trust';
import { useVisits } from '../../../library/context/Visits.context';
import { usePlaces } from '../../../library/context/Places.context';
import { getCase } from '../../../library/helpers';
import { Tile } from '../../../library/components/Tile/Tile.component';
import { Button, Drawer } from '../../../library/components';
import { twMerge } from '../../../library/utilities/twMerge.util';

import { PlaceCard } from './PlaceCard.component';
import { FilterPlaces } from './FilterPlaces';

// MARK: Types

type PlacesViewProps = { places: PlaceSummary[] };

// MARK: Places View

export const PlacesView = ({
    places,
}: PlacesViewProps): ReactElement<PlacesViewProps> => {
    const { visits, isLoading: isLoadingVisits } = useVisits();
    const { places: savedPlaces, isLoading: isLoadingPlaces } = usePlaces();

    // MARK: State

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const router = useRouter();

    // MARK: Return

    return (
        <div
            data-label='page-container'
            className='flex flex-row gap-16 p-16 h-auto bg-pink-200'
        >
            <aside
                data-label='drawer-container'
                className='bg-blue-200 w-48 ml-[-16px] flex flex-col h-[70vh] sticky top-16'
            ></aside>
            <section
                data-label='places-container'
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-flow-row-dense h-full gap-16 w-full'
            >
                {places.map((summary) => {
                    const { placeId } = summary;

                    const place = savedPlaces.find(
                        (place) => place.placeId === placeId
                    );

                    const visited = visits.filter(
                        (visit) => visit.place.placeId === placeId
                    ).length;

                    if (!place) {
                        return (
                            <Tile
                                key={`place-tile-${placeId}`}
                                className='w-full h-full'
                                heading={summary.name}
                                colorScheme='forest'
                                icon={
                                    summary.active
                                        ? {
                                              icon: 'circle-tick',
                                              ariaLabel: 'active',
                                          }
                                        : {
                                              icon: 'circle-cross',
                                              ariaLabel: 'inactive',
                                          }
                                }
                                cta={{
                                    children: 'Go to Page',
                                    onClick: () => {
                                        router.push(
                                            `Places/${getCase(summary.name, 'pascal')}/${summary.placeId}`
                                        );
                                    },
                                }}
                            />
                        );
                    }

                    return (
                        <PlaceCard
                            key={`place-card-${placeId}`}
                            className='col-span-2 sm:col-span-2 row-span-1 sm:row-span-2'
                            link={{
                                href: `Places/${getCase(summary.name, 'pascal')}/${summary.placeId}`,
                            }}
                            place={place}
                            summary={summary}
                            visited={visited}
                        />
                    );
                })}
            </section>
            <Drawer
                divergent='tab'
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
                direction='left'
            >
                <FilterPlaces />
            </Drawer>
        </div>
    );
};

// data-label='' className=''
