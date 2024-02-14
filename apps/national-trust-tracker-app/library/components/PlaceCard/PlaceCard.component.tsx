'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    Card,
    CardFooterItemProps,
    CardFooterItemsProps,
    Tag,
    getCase,
} from '@sam/library';

import { PlaceSummary } from '../../types/national-trust';
import { CompiledPlace } from '../../types/internal';
import { resolveIcon } from '../../helpers';

import * as Chakra from '@chakra-ui/react';

type PlaceCardProps = {
    summary: PlaceSummary;
    place?: CompiledPlace;
    link: Chakra.LinkProps;
    visited: number | undefined;
};

export const PlaceCard = ({
    summary,
    place,
    link,
    visited,
}: PlaceCardProps) => {
    const router = useRouter();

    const { active, name } = summary;
    const today = new Date().toJSON().split('T')[0] as string;

    const [footerItems, setFooterItems] = useState<CardFooterItemsProps>([
        {
            ariaLabel: active ? 'active' : 'inactive',
            color: active ? 'green' : 'red',
            icon: active ? 'circle-tick' : 'circle-cross',
            id: `${summary.placeId}-${active ? 'active' : 'inactive'}-icon`,
            type: 'Icon',
        },
    ]);

    useEffect(() => {
        if (visited) {
            const tag: CardFooterItemProps = {
                children: `${visited} Visits`,
                id: `${summary.placeId}-${visited}`,
                type: 'Tag',
            };

            setFooterItems((prev) => {
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

                        const item: CardFooterItemProps = {
                            ...icon,
                            id: `${summary.placeId}-${facility.reference}`,
                            type: 'Icon',
                        };

                        return item;
                    }
                    return [];
                }
            );

            setFooterItems((prev) => {
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

    if (place) {
        return (
            <Card
                variant='solid'
                footerItems={footerItems}
                heading={{ children: name, preset: 'sub-heading' }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (link.href) {
                        router.push(link.href);
                    }
                }}
                cursor='pointer'
                image={{
                    src: place.images.PRIMARY.url,
                    alt: place.images.PRIMARY.description,
                    isInset: true,
                    width: '30%',
                }}
                layout='horizontal'
                menu={{
                    menuItems: [
                        {
                            label: 'Website',
                            icon: {
                                icon: 'external',
                                ariaLabel: 'external',
                                variant: 'outline',
                            },
                        },
                    ],
                }}
            >
                <Chakra.Flex
                    direction='column'
                    gap={16}
                >
                    <Chakra.Flex gap={8}>
                        <Tag>{place.location.region}</Tag>
                        {place.opening && place.opening.days[today] && (
                            <Tag>
                                {getCase(
                                    place.opening.days[today]?.status || '',
                                    'sentence'
                                )}
                            </Tag>
                        )}
                    </Chakra.Flex>
                    {place.description && (
                        <Chakra.Text>{place.description.strapline}</Chakra.Text>
                    )}
                </Chakra.Flex>
            </Card>
        );
    }

    return (
        <Card
            variant='solid'
            layout='horizontal'
            footerItems={footerItems}
            heading={{ children: name, preset: 'sub-heading' }}
            onClick={(e) => {
                e.stopPropagation();
                if (link.href) {
                    router.push(link.href);
                }
            }}
            cursor='pointer'
        />
    );
};
