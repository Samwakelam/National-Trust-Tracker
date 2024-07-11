'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getCase } from '../../../library/helpers';
import { PlaceSummary } from '../../../library/types/national-trust';
import { twMerge } from '../../../library/utilities/twMerge.util';
import { useVisits } from '../../../library/context/Visits.context';
import { usePlaces } from '../../../library/context/Places.context';
import { Tile } from '../../../library/components/Tile/Tile.component';
import { Drawer } from '../../../library/components';

import { PlaceCard } from './PlaceCard.component';
import { FilterPlaces } from './FilterPlaces.component';

// MARK: Types

type PlacesViewProps = { places: PlaceSummary[] };

// MARK: Places View

export const PlacesView = ({
    places,
}: PlacesViewProps): ReactElement<PlacesViewProps> => {
    const router = useRouter();
    const { visits, isLoading: isLoadingVisits } = useVisits();
    const { places: savedPlaces, isLoading: isLoadingPlaces } = usePlaces();

    // MARK: State

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [propertyFilter, setPropertyFilter] = useState<string>('');
    const [propertyList, setPropertyList] = useState<PlaceSummary[]>([]);

    // MARK: Effects

    useEffect(() => {
        const list = places
            .filter((place) => {
                return place.name
                    .toLowerCase()
                    .includes(propertyFilter.toLowerCase());
            })
            .sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }

                if (b.name > a.name) {
                    return -1;
                }

                return 0;
            });

        setPropertyList(list);
    }, [propertyFilter, savedPlaces]);

    // MARK: Return

    return (
        <>
            <div
                data-label='page-container'
                className='grid grid-cols-[auto_1fr] lg:grid-cols-[2fr_1fr] 3xl:grid-cols-[3fr_1fr] gap-16 p-16 h-auto items-start'
            >
                <aside
                    data-label='drawer-container'
                    className={twMerge(
                        'w-56 ml-[-16px] flex flex-col h-[80vh] sticky top-16',
                        ' lg:ml-0 lg:w-full lg:order-2'
                    )}
                >
                    <FilterPlaces
                        handlePropertyFilter={(name) => setPropertyFilter(name)}
                        propertyList={propertyList}
                        className='hidden lg:flex'
                    />
                </aside>

                <section
                    data-label='places-container'
                    className={twMerge(
                        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8',
                        'grid-flow-row-dense gap-16 w-full',
                        'lg:order-1'
                    )}
                >
                    {propertyList.map((summary) => {
                        const { placeId } = summary;

                        const place = savedPlaces.find(
                            (place) => place.placeId === placeId
                        );

                        const visited = visits.filter(
                            (visit) => visit.place.placeId === placeId
                        ).length;

                        const url = `Places/${getCase(summary.name, 'pascal')}/${summary.placeId}`;

                        if (!place) {
                            const handleClick = () => {
                                setIsLoading(true);
                                router.push(url);
                            };

                            return (
                                <Tile
                                    key={`place-tile-${placeId}`}
                                    className='w-full h-full'
                                    heading={summary.name}
                                    colorScheme='white'
                                    onClick={handleClick}
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
                                        onClick: handleClick,
                                        isLoading,
                                    }}
                                />
                            );
                        }

                        return (
                            <PlaceCard
                                key={`place-card-${placeId}`}
                                className='col-span-2 sm:col-span-2 row-span-1 sm:row-span-2'
                                link={{
                                    href: url,
                                }}
                                place={place}
                                summary={summary}
                                visited={visited}
                            />
                        );
                    })}
                </section>
            </div>
            <Drawer
                divergent='tab'
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
                direction='left'
                className='lg:hidden'
            >
                <FilterPlaces
                    handlePropertyFilter={(name) => setPropertyFilter(name)}
                    propertyList={propertyList}
                />
            </Drawer>
        </>
    );
};

// data-label='' className=''
