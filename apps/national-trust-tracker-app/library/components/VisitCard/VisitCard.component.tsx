'use client';

import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    Card,
    CardFooterItemProps,
    CardFooterItemsProps,
    Heading,
    Icon,
    Modal,
    Tag,
} from '@sam/library';

import { Visit } from '../../types/internal';
import { getAmountInPounds, resolveCurrency, resolveIcon } from '../../helpers';
import { Asset } from '../../types/national-trust';

import * as Chakra from '@chakra-ui/react';

import '../../prototypes/String.extensions';
import { resolvePersonMap } from '../../helpers/resolvePersonMap.helper';

export type VisitCardProps = { visit: Visit };

export const VisitCard = ({
    visit,
}: VisitCardProps): ReactElement<VisitCardProps> => {
    const router = useRouter();

    const [footerItems, setFooterItems] = useState<CardFooterItemsProps>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const facilityIcons = visit.facilitiesUsed.flatMap((facility) => {
            const icon = resolveIcon(facility.reference);
            if (icon) {
                const item: CardFooterItemProps = {
                    ...icon,
                    type: 'Icon',
                    id: `${visit.date}-${facility.reference}`,
                };

                return item;
            }
            return [];
        });

        const people: CardFooterItemProps = {
            type: 'Tag',
            id: `${visit.date}-people-tag`,
            children: `${visit.people.length} visitors`,
            tooltip: {
                label: visit.people.map(resolvePersonMap),
            },
        };

        const travelIcons = visit.travel.flatMap((vehicle) => {
            const icon = resolveIcon(vehicle);
            if (icon) {
                const item: CardFooterItemProps = {
                    ...icon,
                    type: 'Icon',
                    id: `${visit.date}-${vehicle}`,
                };

                return item;
            }
            return [];
        });

        setFooterItems((prev) => {
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
        <>
            <Card
                heading={{
                    children: new Date(visit.date).toDateString(),
                    preset: 'sub-heading',
                }}
                footerItems={footerItems}
                variant='solid'
                menu={{
                    menuItems: [
                        {
                            label: `Visit Property Page`,
                            icon: {
                                icon: 'file',
                                ariaLabel: 'page',
                                variant: 'outline',
                            },
                            onClick: () => {
                                router.push(
                                    `/Places/${visit.place.name}/${visit.place.placeId}`
                                );
                            },
                        },
                    ],
                }}
                cursor='pointer'
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    setIsModalOpen(true);
                }}
            >
                <Chakra.Flex gap={8}>
                    <Tag>{visit.place.location.region}</Tag>
                </Chakra.Flex>
                <Chakra.Flex gap={8}>
                    <Chakra.Text as='b'>{visit.place.name}</Chakra.Text>
                    {visit.assetsUsed.map(resolveAssetMap)}
                </Chakra.Flex>

                <Chakra.Text
                    display='flex'
                    gap={8}
                >
                    <Chakra.chakra.span>Total: </Chakra.chakra.span>
                    <Chakra.chakra.span>
                        {resolveCurrency('GBP')}
                        {getAmountInPounds(visit.totalPrice)}
                    </Chakra.chakra.span>
                </Chakra.Text>
            </Card>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={new Date(visit.date).toDateString()}
            >
                <Heading preset='modal-heading'>{visit.place.name}</Heading>

                <Card
                    heading={{ preset: 'sub-heading', children: 'Tickets' }}
                    colorScheme='gray'
                    variant='outline'
                    hasNegativeMargin
                >
                    <Chakra.Flex>
                        <Chakra.Text>
                            {visit.people.map(resolvePersonMap)}
                        </Chakra.Text>
                    </Chakra.Flex>
                    {visit.tickets.map((ticket) => {
                        return (
                            <Chakra.Flex
                                key={`ticket-${ticket.name}`}
                                justifyContent='space-between'
                                gap={16}
                            >
                                <Chakra.Flex gap={8}>
                                    <Chakra.Text as='b'>
                                        {ticket.name}
                                    </Chakra.Text>
                                    <Chakra.Text>{ticket.qty}</Chakra.Text>
                                </Chakra.Flex>
                                <Chakra.Flex gap={8}>
                                    <Chakra.Text>
                                        {resolveCurrency(
                                            ticket.standardAmount.currency
                                        )}
                                    </Chakra.Text>
                                    <Chakra.Text>
                                        {getAmountInPounds(
                                            ticket.standardAmount.amount
                                        )}
                                    </Chakra.Text>
                                    <Chakra.Text>each</Chakra.Text>
                                </Chakra.Flex>
                            </Chakra.Flex>
                        );
                    })}
                </Card>
                <Card
                    heading={{
                        preset: 'sub-heading',
                        children: 'Facilities Used',
                    }}
                    colorScheme='gray'
                    variant='outline'
                    hasNegativeMargin
                >
                    {visit.facilitiesUsed.map((facility) => {
                        const icon = resolveIcon(facility.reference);

                        return (
                            <Chakra.Flex
                                key={`facility-${facility.reference}`}
                                gap={8}
                                alignItems='center'
                            >
                                {icon && <Icon {...icon} />}

                                <Chakra.Text
                                    display='flex'
                                    flexDirection='row'
                                    as='b'
                                >
                                    {facility.name}
                                </Chakra.Text>
                            </Chakra.Flex>
                        );
                    })}
                </Card>
                <Card
                    heading={{
                        preset: 'sub-heading',
                        children: 'Assets Used',
                    }}
                    colorScheme='gray'
                    variant='outline'
                    hasNegativeMargin
                >
                    {visit.assetsUsed.map(resolveAssetMap)}
                </Card>
                <Card
                    heading={{
                        preset: 'sub-heading',
                        children: 'Travelled By:',
                    }}
                    colorScheme='gray'
                    variant='outline'
                    hasNegativeMargin
                >
                    {visit.travel.map((vehicle) => {
                        const icon = resolveIcon(vehicle);

                        return (
                            <Chakra.Flex
                                key={`facility-${vehicle}`}
                                gap={8}
                                alignItems='center'
                            >
                                {icon && <Icon {...icon} />}

                                <Chakra.Text
                                    display='flex'
                                    flexDirection='row'
                                    as='b'
                                >
                                    {vehicle.toCapitalisedCase()}
                                </Chakra.Text>
                            </Chakra.Flex>
                        );
                    })}
                </Card>
            </Modal>
        </>
    );
};

const resolveAssetTagColorScheme = (asset: string) => {
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



const resolveAssetMap = (asset: Asset) => {
    return (
        <Tag
            key={`asset-tag-${asset.name}`}
            colorScheme={resolveAssetTagColorScheme(asset.name)}
        >
            {asset.name}
        </Tag>
    );
};
