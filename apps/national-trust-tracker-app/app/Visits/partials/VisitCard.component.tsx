'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
    Card,
    Icon,
    IconProps,
    IndicatorProps,
    Modal,
    Tag,
    TagProps,
} from '../../../library/components';
import {
    getAmountInPounds,
    getCase,
    resolveCurrency,
    resolveIcon,
} from '../../../library/helpers';
import { VisitDB } from '../../../library/types/internal';
import { Asset } from '../../../library/types/national-trust';
import { useVisits } from '../../../library/context/Visits.context';

// MARK: Types

type VisitCardProps = {
    visit: VisitDB;
};

// MARK: Component

export const VisitCard = ({ visit }: VisitCardProps) => {
    const router = useRouter();
    const { isLoading, onDeleteVisit } = useVisits();

    // MARK: State

    const [indicators, setIndicators] = useState<IndicatorProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // MARK: handlers

    const handleGoToPropertyPage = () => {
        router.push(
            `/Places/${getCase(visit.place.name, 'pascal')}/${visit.place.placeId}`
        );
    };

    // MARK: Effects

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
            type: 'badge',
            id: `${visit.date}-people-badge`,
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

    // MARK: Return

    return (
        <>
            <Card
                heading={new Date(visit.date).toDateString()}
                menu={{
                    menuItems: [
                        {
                            label: 'Visit Property Page',
                            onClick: () => handleGoToPropertyPage(),
                        },
                        {
                            label: 'Delete Visit',
                            onClick: () => onDeleteVisit(visit._id),
                            isLoading,
                        },
                    ],
                }}
                indicators={indicators}
                image={{
                    src: visit.place.images.PRIMARY.url,
                    alt: visit.place.images.PRIMARY.description,
                }}
                direction='horizontal'
                className='w-full'
                colorScheme='white'
                onClick={() => setIsModalOpen(true)}
            >
                <div className='flex flex-col gap-8'>
                    <p className='font-bold'>{visit.place.name}</p>
                    <div className='flex flex-row gap-8'>
                        {visit.assetsUsed.map(resolveAssetMap)}
                    </div>
                </div>
                <div
                    data-label='region'
                    className='flex flex-row gap-8'
                >
                    <p>{visit.place.location.region}</p>
                </div>

                <p>
                    <span>Total: </span>
                    <span>
                        {resolveCurrency('GBP')}
                        {getAmountInPounds(visit.totalPrice)}
                    </span>
                </p>
            </Card>

            {/* MARK: Modal
             */}

            <Modal
                onClose={() => setIsModalOpen(false)}
                isOpen={isModalOpen}
                heading={new Date(visit.date).toDateString()}
                confirmCTA={{
                    children: 'Property Page',
                    onClick: () => handleGoToPropertyPage(),
                }}
                declineCTA={{
                    children: 'Property Website',
                    link: {
                        href: visit.place.websiteUrl,
                    },
                    divergent: 'ghost',
                }}
            >
                <h2 className='font-bold text-32'>{visit.place.name}</h2>
                <div className='grid grid-cols-3 gap-16 w-full'>
                    <Card
                        divergent='outline'
                        className='w-full'
                    >
                        <h3 className='font-bold text-24'>Visitors</h3>
                        <div className='flex flex-col gap-8'>
                            {visit.people.map((person) => (
                                <div
                                    className='flex flex-row gap-8'
                                    key={`visit-people-${person}`}
                                >
                                    <Icon
                                        icon='user'
                                        ariaLabel='person'
                                        variant='outline'
                                    />
                                    <p>{person.name}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card
                        divergent='outline'
                        className='w-full'
                    >
                        <h3 className='font-bold text-24'>Assets Used</h3>
                        <div className='flex flex-col gap-8'>
                            {visit.assetsUsed.map((asset) => {
                                const icon = resolveAssetIcon(asset);
                                return (
                                    <div className='flex flex-row gap-8 items-center'>
                                        {icon && (
                                            <Icon
                                                {...icon}
                                                variant='outline'
                                            />
                                        )}
                                        <p>{asset.name.split('|')[0]}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                    <Card
                        divergent='outline'
                        className='w-full'
                    >
                        <h3 className='font-bold text-24'>Facilities Used</h3>
                        <div className='flex flex-col gap-8'>
                            {visit.facilitiesUsed.map((facility) => {
                                const icon = resolveIcon(facility.reference);
                                return (
                                    <div className='flex flex-row gap-8 items-center'>
                                        {icon && (
                                            <Icon
                                                {...icon}
                                                variant='outline'
                                            />
                                        )}
                                        <p>{facility.name.split('|')[0]}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </Modal>
        </>
    );
};

// MARK: Resolve Functions

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
    const getColourScheme = (): TagProps['colorScheme'] => {
        const name = asset.name.split('|')[0]?.toLowerCase();

        if (name?.includes('shop')) return 'pink';
        if (name?.includes('caf')) return 'blue';
        if (name?.includes('tea')) return 'blue';
        if (name?.includes('garden')) return 'lime';
        if (name?.includes('walk')) return 'green';
        if (name?.includes('wood')) return 'forest';
        if (name?.includes('restaurant')) return 'sky';
        if (name?.includes('house')) return 'orange';
        if (name?.includes('castle')) return 'amber';
        if (name?.includes('servant')) return 'violet';

        return 'slate';
    };

    return (
        <Tag
            key={`asset-tag-${asset.name}`}
            colorScheme={getColourScheme()}
            divergent='solidOutline'
        >
            {asset.name.split('|')[0]}
        </Tag>
    );
};

export const resolveAssetIcon = (asset: Asset): IconProps | null => {
    const name = asset.name.split('|')[0]!.toLowerCase();

    if (name?.includes('shop'))
        return {
            icon: 'placeholder',
            ariaLabel: 'placeholder',
        };
    if (name?.includes('caf'))
        return {
            icon: 'coffee',
            ariaLabel: 'coffee',
        };
    if (name?.includes('tea'))
        return {
            icon: 'coffee',
            ariaLabel: 'coffee',
        };
    if (name?.includes('garden'))
        return {
            icon: 'flower',
            ariaLabel: 'flower',
        };
    if (name?.includes('walk'))
        return {
            icon: 'tree',
            ariaLabel: 'tree',
        };
    if (name?.includes('wood'))
        return {
            icon: 'tree-pine',
            ariaLabel: 'pine tree',
        };
    if (name?.includes('restaurant'))
        return {
            icon: 'soup',
            ariaLabel: 'soup ladle',
        };
    if (name?.includes('house'))
        return {
            icon: 'house',
            ariaLabel: 'house',
        };
    if (name?.includes('castle'))
        return {
            icon: 'castle',
            ariaLabel: 'castle',
        };
    if (name?.includes('servant'))
        return {
            icon: 'shop',
            ariaLabel: 'shopping bag',
        };
    if (name?.includes('car'))
        return {
            icon: 'car',
            ariaLabel: 'car',
        };

    return null;
};
