'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SavedPlace } from '../../../library/types/internal';
import { PlaceSummary } from '../../../library/types/national-trust';
import { LinkProps } from '../../../library/types';

import { getCase, resolveIcon } from '../../../library/helpers';
import { isolateClickEvent } from '../../../library/helpers/isolateClickEvent.helper';

import { Card, IndicatorProps, Tag } from '../../../library/components';

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
            const tag: IndicatorProps = {
                children: `${visited} Visits`,
                id: `${summary.placeId}-${visited}`,
                type: 'tag',
            };

            setIndicators((prev) => {
                const newArray = [...prev];
                const exists =
                    newArray.filter((item) => {
                        return item.id === tag.id;
                    }).length > 0;

                if (exists) return newArray;
                return [...newArray, tag];
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
            image={{
                src: place.images.PRIMARY.url,
                alt: place.images.PRIMARY.description,
            }}
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
                data-label=''
                className='flex flex-row gap-8'
            >
                <Tag>{place.location.region}</Tag>
                {place.opening && place.opening.days[today] && (
                    <Tag>
                        {getCase(
                            place.opening.days[today]?.status || '',
                            'sentence'
                        )}
                    </Tag>
                )}
            </div>
            {place.description && <p>{place.description.strapline}</p>}
        </Card>
    );
};
