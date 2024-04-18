'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Card, IndicatorProps, Tag } from '../../../library/components';
import {
    getAmountInPounds,
    getCase,
    resolveCurrency,
    resolveIcon,
    resolvePersonMap,
} from '../../../library/helpers';
import { VisitDB } from '../../../library/types/internal';
import { Asset } from '../../../library/types/national-trust';
import { useVisits } from '../../../library/context/Visits.context';

type VisitCardProps = {
    visit: VisitDB;
};

export const VisitCard = ({ visit }: VisitCardProps) => {
    const router = useRouter();
    const { isLoading, onDeleteVisit } = useVisits();

    const [indicators, setIndicators] = useState<IndicatorProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const facilityIcons = visit.facilitiesUsed.flatMap((facility) => {
            const icon = resolveIcon(facility.reference);
            if (icon) {
                const item: IndicatorProps = {
                    ...icon,
                    type: 'icon',
                    id: `${visit.date}-${facility.reference}`,
                };

                return item;
            }
            return [];
        });

        const people: IndicatorProps = {
            type: 'tag',
            id: `${visit.date}-people-tag`,
            children: `${visit.people.length} visitors`,
            // tooltip: {
            //     label: visit.people.map(resolvePersonMap),
            // },
        };

        const travelIcons = visit.travel.flatMap((vehicle) => {
            const icon = resolveIcon(vehicle);
            if (icon) {
                const item: IndicatorProps = {
                    ...icon,
                    type: 'icon',
                    id: `${visit.date}-${vehicle}`,
                };

                return item;
            }
            return [];
        });

        setIndicators((prev) => {
            const newArray = [...prev];

            const tagExists =
                newArray.filter((item) => {
                    return item.id === people.id;
                }).length > 0;

            if (!tagExists) newArray.push(people);

            travelIcons.forEach((icon) => {
                const vehicleExists =
                    newArray.filter((item) => {
                        return item.id === icon.id;
                    }).length > 0;

                if (!vehicleExists) newArray.push(icon);
            });

            facilityIcons.forEach((icon) => {
                const facilityExists =
                    newArray.filter((item) => {
                        return item.id === icon.id;
                    }).length > 0;

                if (!facilityExists) newArray.push(icon);
            });

            return newArray;
        });
    }, [visit]);

    return (
        <Card
            heading={new Date(visit.date).toDateString()}
            menu={{
                menuItems: [
                    {
                        label: 'Visit Property Page',
                        onClick: () =>
                            router.push(
                                `/Places/${getCase(visit.place.name, 'pascal')}/${visit.place.placeId}`
                            ),
                    },
                    {
                        label: 'Delete Visit',
                        onClick: () => onDeleteVisit(visit._id),
                    },
                ],
            }}
            indicators={indicators}
            image={{
                src: visit.place.images.PRIMARY.url,
                alt: visit.place.images.PRIMARY.description,
            }}
        >
            <div className='flex flex-row gap-8'>
                <p>{visit.place.location.region}</p>
            </div>
            <div className='flex flex-row gap-8'>
                <p className='font-bold'>{visit.place.name}</p>
                {visit.assetsUsed.map(resolveAssetMap)}
            </div>

            <p>
                <span>Total: </span>
                <span>
                    {resolveCurrency('GBP')}
                    {getAmountInPounds(visit.totalPrice)}
                </span>
            </p>
        </Card>
    );
};

export const resolveAssetTagColorScheme = (asset: string) => {
    const cafeTypes: string[] = ['tea', 'caf', 'restaurant', 'kitchen'];

    if (cafeTypes.some((value) => asset.toLowerCase().includes(value)))
        return 'purple';

    switch (asset) {
        case 'House':
            return 'blue';
        case 'Garden':
            return 'green';
        case 'Park':
            return 'teal';
        case 'Castle':
            return 'yellow';
        case 'Shop':
            return 'pink';
        default:
            return undefined;
    }
};

export const resolveAssetMap = (asset: Asset) => {
    return <Tag key={`asset-tag-${asset.name}`}>{asset.name}</Tag>;
};
