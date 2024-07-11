'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SavedPlace } from '../../../library/types/internal';
import { Day, PlaceSummary } from '../../../library/types/national-trust';
import { LinkProps } from '../../../library/types';

import { getCase, resolveIcon } from '../../../library/helpers';
import { isolateClickEvent } from '../../../library/helpers/isolateClickEvent.helper';

import {
    Card,
    IndicatorProps,
    Tag,
    TagProps,
} from '../../../library/components';

import '../../../library/prototypes/String.extensions';

// MARK: Types

type PlaceCardProps = {
    link?: LinkProps;
    place: SavedPlace;
    summary: PlaceSummary;
    visited: number | undefined;
    className?: string;
};

// MARK: Place Card

export const PlaceCard = ({
    link,
    place,
    summary,
    visited,
    className,
}: PlaceCardProps) => {
    const router = useRouter();

    const { active, name } = summary;
    const today = new Date().toJSON().split('T')[0] as string;

    // MARK: State

    const [indicators, setIndicators] = useState<IndicatorProps[]>([
        {
            ariaLabel: active ? 'active' : 'inactive',
            icon: active ? 'circle-tick' : 'circle-cross',
            id: `${summary.placeId}-${active ? 'active' : 'inactive'}-icon`,
            type: 'icon',
        },
    ]);

    // MARK: Effects

    useEffect(() => {
        if (visited) {
            const badge: IndicatorProps = {
                children: `${visited} Visits`,
                id: `${summary.placeId}-${visited}`,
                type: 'badge',
                className: 'text-nowrap',
                colorScheme: 'forest',
                divergent: 'outline',
            };

            setIndicators((prev) => {
                const newArray = [...prev];
                const exists =
                    newArray.filter((item) => {
                        return item.id === badge.id;
                    }).length > 0;

                if (exists) return newArray;
                return [...newArray, badge];
            });
        }
    }, [visited]);

    useEffect(() => {
        if (place && place.facilities) {
            const facilityIcons = place.facilities.facilities.flatMap(
                (facility) => {
                    if (facility.available && facility.reference) {
                        const icon = resolveIcon(facility.reference);
                        if (!icon) return [];

                        const item: IndicatorProps = {
                            ...icon,
                            id: `${summary.placeId}-${facility.reference}`,
                            type: 'icon',
                        };

                        return item;
                    }
                    return [];
                }
            );

            setIndicators((prev) => {
                const newArray = [...prev];
                facilityIcons.forEach((icon) => {
                    const exists =
                        newArray.filter((item) => {
                            return item.id === icon.id;
                        }).length > 0;

                    if (!exists) newArray.push(icon);
                });
                return newArray;
            });
        }
    }, [place]);

    // MARK: Return

    return (
        <Card
            className={className}
            colorScheme='white'
            indicators={indicators}
            heading={name}
            onClick={isolateClickEvent(() => {
                if (link) {
                    router.push(link.href);
                }
            })}
            image={
                place.images
                    ? {
                          src: place.images.PRIMARY.url,
                          alt: place.images.PRIMARY.description,
                      }
                    : undefined
            }
            menu={{
                menuItems: [
                    {
                        label: 'Website',
                        icon: {
                            icon: 'external',
                            ariaLabel: 'external',
                            variant: 'outline',
                        },
                        link: {
                            href: place.websiteUrl,
                        },
                    },
                ],
            }}
        >
            <div
                data-label='tag-box'
                className='flex flex-row gap-8 flex-wrap'
            >
                <Tag>{place.location.region}</Tag>
                {place.opening && place.opening.days[today] && (
                    <Tag
                        colorScheme={resolveTagColorScheme(
                            place.opening.days[today]?.status
                        )}
                    >
                        {getCase(
                            place.opening.days[today]?.status || '',
                            'sentence'
                        ).toCapitalisedCase()}
                    </Tag>
                )}
            </div>
            {place.description && <p>{place.description.strapline}</p>}
        </Card>
    );
};
// MARK: Resolve Functions

const resolveTagColorScheme = (
    status: Day['status'] | undefined
): TagProps['colorScheme'] => {
    switch (status) {
        case 'FULLY_OPEN':
            return 'forest';
        case 'PARTIALLY_OPEN':
            return 'amber';
        case 'CLOSED':
            return 'red';
        default:
            return 'slate';
    }
};
