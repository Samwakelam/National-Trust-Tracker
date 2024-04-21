'use client';

import React, { ReactElement } from 'react';

import { PlaceSummary } from '../../../library/types/national-trust';
import { useVisits } from '../../../library/context/Visits.context';
import { usePlaces } from '../../../library/context/Places.context';

import { PlaceCard } from './PlaceCard.component';
import { getCase } from '../../../library/helpers';
import { Tile } from '../../../library/components/Tile/Tile.component';
import { useRouter } from 'next/navigation';

type PlacesViewProps = { places: PlaceSummary[] };

export const PlacesView = ({
    places,
}: PlacesViewProps): ReactElement<PlacesViewProps> => {
    const { visits, isLoading: isLoadingVisits } = useVisits();
    const { places: savedPlaces, isLoading: isLoadingPlaces } = usePlaces();

    const router = useRouter();

    return (
        <div
            data-label='page-container'
            className='flex flex-col gap-16 p-16 min-h-full'
        >
            <div className='grid grid-cols-2 sm:grid-cols-3 grid-flow-row-dense bg-blue-100 gap-8 w-full'>
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
                            <div
                                key={`place-tile-${placeId}`}
                                className='col-span-1'
                            >
                                <Tile
                                    className='w-full h-full'
                                    heading={summary.name}
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
                            </div>
                        );
                    }

                    return (
                        <div
                            key={`place-card-${placeId}`}
                            className='col-span-2 sm:col-span-3'
                        >
                            <PlaceCard
                                key={`place-card-${placeId}`}
                                link={{
                                    href: `Places/${getCase(summary.name, 'pascal')}/${summary.placeId}`,
                                }}
                                place={place}
                                summary={summary}
                                visited={visited}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// data-label='' className=''
