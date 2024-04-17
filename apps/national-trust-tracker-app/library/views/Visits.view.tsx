'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    Button,
    ContainerPage,
    ContainerScrollBox,
    Frame,
    Heading,
    InputGroup,
    SelectGroup,
} from '@sam/library';

import { RegionType, regionType } from '../types/national-trust';
import { Visit } from '../types/internal';
import { VisitCard } from '../components';

import * as Chakra from '@chakra-ui/react';

import '../prototypes/String.extensions';

export type VisitsViewProps = {
    visits: Visit[];
    handleDelete: (visitId: string) => void;
};

type Form = {
    name: string;
    dateFrom: string;
    dateTo: string;
    region: string;
};

export const VisitsView = ({
    visits,
    handleDelete,
}: VisitsViewProps): ReactElement<VisitsViewProps> => {
    const [filters, setFilters] = useState<Form>({
        name: '',
        dateTo: '',
        dateFrom: '',
        region: '',
    });

    const [visitList, setVisitList] =
        useState<VisitsViewProps['visits']>(visits);

    const {
        register,
        formState: { errors },
    } = useForm<Form>({ mode: 'onChange' });

    useEffect(() => {}, []);

    useEffect(() => {
        const name = filters.name;
        const dateTo = filters.dateTo;
        const dateFrom = filters.dateFrom;
        const region = filters.region;

        if (!name && !dateTo && !dateFrom) setVisitList(visits);

        const newVisits = visits.filter((visit) => {
            return (
                (name
                    ? visit.place.name
                          .toLowerCase()
                          .includes(name.toLowerCase())
                    : true) &&
                (dateFrom
                    ? new Date(visit.date) >= new Date(dateFrom)
                    : true) &&
                (dateTo ? new Date(visit.date) <= new Date(dateTo) : true) &&
                (region ? visit.place.location.region.includes(region) : true)
            );
        });
        setVisitList(newVisits);
    }, [filters]);

    const handleFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.currentTarget.value;

        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(() => {}, [visitList]);

    return (
        <ContainerPage>
            <ContainerScrollBox>
                <Frame id='visits-frame'>
                    <Chakra.Grid
                        gridTemplateColumns={['1fr', '2fr 1fr']}
                        columnGap={32}
                        rowGap={20}
                        w='100%'
                    >
                        <Chakra.GridItem
                            order={[2, 1]}
                            display='flex'
                            flexDirection='column'
                            gap={20}
                        >
                            {visitList
                                .sort((a, b) => {
                                    if (new Date(a.date) < new Date(b.date)) {
                                        return 1;
                                    }

                                    if (new Date(b.date) < new Date(a.date)) {
                                        return -1;
                                    }

                                    return 0;
                                })
                                .map((visit, index) => {
                                    return (
                                        <VisitCard
                                            key={`visits-${visit.date}-${visit.place.placeId}-${index}`}
                                            visit={visit}
                                            handleDelete={handleDelete}
                                        />
                                    );
                                })}
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            order={[1, 2]}
                            position='sticky'
                            height='50vh'
                            top='60px'
                        >
                            <InputGroup<Form>
                                name='name'
                                label='Search By Property Name'
                                formRegister={{
                                    register,
                                    options: {
                                        onChange: (e) => handleFilters(e),
                                    },
                                }}
                                errors={errors}
                                labelConfig={{ hideBadge: true }}
                            />
                            <Chakra.Text mb={8}>
                                Search By Date Range:
                            </Chakra.Text>
                            <Chakra.Flex gap={8}>
                                <InputGroup<Form>
                                    name='dateFrom'
                                    label='From'
                                    formRegister={{
                                        register,
                                        options: {
                                            onChange: (e) => handleFilters(e),
                                        },
                                    }}
                                    errors={errors}
                                    inputConfig={{ type: 'date' }}
                                    labelConfig={{ hideBadge: true }}
                                />
                                <InputGroup<Form>
                                    name='dateTo'
                                    label='To'
                                    formRegister={{
                                        register,
                                        options: {
                                            onChange: (e) => handleFilters(e),
                                        },
                                    }}
                                    errors={errors}
                                    inputConfig={{ type: 'date' }}
                                    labelConfig={{
                                        hideBadge: true,
                                    }}
                                />
                            </Chakra.Flex>
                            <SelectGroup<Form, RegionType>
                                name='region'
                                label='Search By Region'
                                formRegister={{
                                    register,
                                    options: {
                                        onChange: (e) => handleFilters(e),
                                    },
                                }}
                                errors={errors}
                                labelConfig={{ hideBadge: true }}
                                options={regionType.map((region) => region)}
                            />
                            <Chakra.Text
                                mt={20}
                            >{`Showing ${visitList.length} ${visitList.length === 1 ? 'visit' : 'visits'}`}</Chakra.Text>
                        </Chakra.GridItem>
                    </Chakra.Grid>
                </Frame>
            </ContainerScrollBox>
        </ContainerPage>
    );
};
