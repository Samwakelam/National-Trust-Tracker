'use client';

import { ReactElement, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import {
    Card,
    CardFooterItemProps,
    CardFooterItemsProps,
    Tag,
    getCase,
} from '@sam/library';

import { Visit } from '../../types/internal';

import { getAmountInPounds, resolveCurrency, resolveIcon } from '../../helpers';
import { resolvePersonMap } from '../../helpers/resolvePersonMap.helper';

import { VisitCardModal } from './VisitCardModal.component';
import { resolveAssetMap } from './VisitCard.helpers';

import * as Chakra from '@chakra-ui/react';

import '../../prototypes/String.extensions';
import { revalidatePath } from 'next/cache';
import { deleteVisitById } from '../../../app/api/Visits/[visitId]/route';

export type VisitCardProps = {
    visit: Visit;
    handleDelete: (visitId: string) => void;
};

export const VisitCard = ({
    visit,
    handleDelete,
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
                                    `/Places/${getCase(visit.place.name, 'pascal')}/${visit.place.placeId}`
                                );
                            },
                        },
                        {
                            label: `Delete Visit`,
                            icon: {
                                icon: 'bin',
                                ariaLabel: 'delete',
                                variant: 'outline',
                            },
                            onClick: () => handleDelete(visit._id),
                        },
                    ],
                }}
                layout='horizontal'
                image={{
                    src: visit.place.images.PRIMARY.url,
                    alt: visit.place.images.PRIMARY.description,
                    isInset: true,
                    width: '30%',
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
            <VisitCardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                visit={visit}
            />
        </>
    );
};
