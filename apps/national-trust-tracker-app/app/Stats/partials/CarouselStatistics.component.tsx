'use client';

import { useEffect, useMemo } from 'react';

import { ReduceMapProps } from '../../../library/context/Visits.helpers';
import { getCase, resolveIcon } from '../../../library/helpers';
import { Membership } from '../../../library/types/internal';

import {
    Card,
    Carousel,
    IconProps,
    Tile,
    TileProps,
} from '../../../library/components';

import '../../../library/prototypes/String.extensions';

// MARK: Types

type CarouselStatisticsProps = {
    membership: Membership;
    onTypeSelect: (type: string) => void;
    selectedType: string;
    statsSet: ReduceMapProps;
};

// MARK: Component

export const CarouselStatistics = ({
    membership,
    onTypeSelect,
    selectedType,
    statsSet,
}: CarouselStatisticsProps) => {
    const allStats = useMemo(() => {
        return statsSet;
    }, [statsSet]);

    // MARK: Handlers

    const getHighestValue = (record: Record<string, number>) => {
        if (!record) return null;

        const keys = Object.keys(record);

        if (keys.length === 0) return null;

        return keys.reduce((a, b) => {
            return record[a]! > (record[b] || 0) ? a : b;
        });
    };

    const getCount = (record: Record<string, number>) => {
        return Object.keys(record).length;
    };

    const getFavouriteGuest = (record: Record<string, number>) => {
        const stats = Object.keys(record).reduce(
            (prev, current) => {
                const blacklist = [
                    'together',
                    ...membership.members.map((member) =>
                        member.name.toLowerCase()
                    ),
                ];

                if (blacklist.includes(current)) return prev;

                prev[current] = record[current]!;
                return prev;
            },
            {} as Record<string, number>
        );

        return getHighestValue(stats);
    };

    // MARK: Return

    return (
        <Carousel
            visibleSlides={3}
            colorScheme='sky'
        >
            {Array.from([
                'Places',
                'People',
                'Assets',
                'Facilities',
                'Regions',
                'Travel',
            ]).map((item) => {
                const key = item.toLowerCase();

                const stats = allStats[key as keyof ReduceMapProps];

                if (typeof stats === 'number') return <></>;

                const favourite =
                    item === 'People'
                        ? getFavouriteGuest(stats)
                        : getHighestValue(stats);
                const count = getCount(stats);

                const isActive = selectedType === key;

                return (
                    <Card
                        preset='quartered'
                        key={`carousel-card-${item}`}
                        heading={item}
                        className='w-full h-full'
                        colorScheme='white'
                        confirmCTA={{
                            children: `View ${item} Stats`,
                            divergent: 'outline',
                            className: 'w-full',
                            onClick: () =>
                                isActive ? onTypeSelect('') : onTypeSelect(key),
                            isActive,
                            colorScheme: 'sky',
                        }}
                    >
                        <Tile
                            icon={getFavouriteIcon(item)}
                            heading='Favourite'
                            description={
                                favourite
                                    ? getCase(
                                          favourite,
                                          'sentence'
                                      ).toCapitalisedCase()
                                    : undefined
                            }
                            colorScheme='pink'
                        />
                        <Tile
                            icon={{
                                icon: 'abacus',
                                ariaLabel: 'count',
                            }}
                            heading='Different'
                            description={count ? `${count} ${item}` : undefined}
                            colorScheme='forest'
                        />
                        <Tile
                            description={
                                item === 'Places'
                                    ? `${allStats.visits} visits`
                                    : undefined
                            }
                            {...resolveTileThree(item, stats, [
                                ...(favourite ? [favourite] : []),
                            ])}
                            colorScheme='slate'
                        />
                        <Tile
                            {...resolveTileFour(item, stats, [
                                ...(favourite ? [favourite] : []),
                                'together',
                            ])}
                            colorScheme='sky'
                        />
                    </Card>
                );
            })}
        </Carousel>
    );
};

// MARK: Resolve Functions

const resolveTileThree = (
    key: string,
    stats: Record<string, number>,
    exclude: string[] = []
): TileProps => {
    const keys = Object.keys(stats).filter((k) => {
        if (Object.keys(stats).length === 1) return true;
        return !exclude.includes(k);
    });
    const randomIndex = Math.floor(keys.length * Math.random());

    const k = keys[randomIndex]!;
    const v = stats[k] || 'No Record';

    switch (key) {
        case 'Regions':
            return {
                icon: { icon: 'map', ariaLabel: 'map', variant: 'outline' },
                heading: k
                    ? getCase(k, 'sentence').toCapitalisedCase()
                    : undefined,
                description: `${v}`,
            };
        case 'Places':
            return {
                icon: {
                    icon: 'ticket',
                    ariaLabel: 'visit',
                    variant: 'outline',
                },
                heading: 'Total',
            };
        case 'People':
            return {
                icon: {
                    icon: 'heart-together',
                    ariaLabel: 'together',
                    variant: 'outline',
                },
                heading: 'Visits Together',
                description: `${stats.together} visits`,
            };
        case 'Travel':
            return {
                icon: resolveIcon(k) || { icon: 'car', ariaLabel: 'car' },
                heading: k
                    ? getCase(k, 'sentence').toCapitalisedCase()
                    : undefined,
                description: `${v}`,
            };
        default:
            return {
                icon: getAssetsIcon(k),
                heading: k
                    ? getCase(k, 'sentence').toCapitalisedCase()
                    : undefined,
                description: `${v}`,
            };
    }
};

const resolveTileFour = (
    key: string,
    stats: Record<string, number>,
    exclude: string[] = []
): TileProps => {
    const keys = Object.keys(stats).filter((k) => {
        if (Object.keys(stats).length === 1) return true;
        return !exclude.includes(k);
    });

    const randomIndex = Math.floor(keys.length * Math.random());

    const k = keys[randomIndex]!;
    const v = stats[k] || 'No Record';

    switch (key) {
        case 'Regions':
            return {
                icon: { icon: 'map', ariaLabel: 'map', variant: 'outline' },
                heading: k
                    ? getCase(k, 'sentence').toCapitalisedCase()
                    : undefined,
                description: `${v}`,
            };
        case 'People':
            return {
                icon: { icon: 'user', ariaLabel: 'person', variant: 'outline' },
                heading: k
                    ? getCase(k, 'sentence').toCapitalisedCase()
                    : undefined,
                description: `${v}`,
            };
        case 'Travel':
            return {
                icon: resolveIcon(k) || { icon: 'car', ariaLabel: 'car' },
                heading: k
                    ? getCase(k, 'sentence').toCapitalisedCase()
                    : undefined,
                description: `${v}`,
            };
        default:
            return {
                icon: getAssetsIcon(k),
                heading: k
                    ? getCase(k, 'sentence').toCapitalisedCase()
                    : undefined,
                description: `${v}`,
            };
    }
};

// MARK: Maps

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
        case 'plant-shop':
            return {
                icon: 'nt-plant-shop',
                ariaLabel: 'plant-shop',
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

const getFavouriteIcon = (key: string): IconProps => {
    switch (key) {
        case 'People':
            return {
                icon: 'user-heart',
                ariaLabel: 'user heart',
                variant: 'outline',
            };
        case 'Places':
            return {
                icon: 'location-heart',
                ariaLabel: 'location heart',
                variant: 'outline',
            };
        case 'Travel':
            return {
                icon: 'map-heart',
                ariaLabel: 'map heart',
                variant: 'outline',
            };
        case 'Facilities':
            return {
                icon: 'bag-heart',
                ariaLabel: 'camera heart',
                variant: 'outline',
            };
        case 'Assets':
            return {
                icon: 'house-heart',
                ariaLabel: 'house heart',
                variant: 'outline',
            };

        default:
            return {
                icon: 'heart',
                ariaLabel: 'heart',
                variant: 'outline',
            };
    }
};
