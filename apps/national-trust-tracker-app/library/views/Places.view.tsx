'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    ContainerScrollBox,
    ContainerPage,
    Spinner,
    Frame,
    getCase,
    InputGroup,
} from '@sam/library';

import { PlaceSummary, Places } from '../types/national-trust/places.type';
import { CompiledPlace, Visit } from '../types/internal';
import { PlaceCard } from '../components';

import * as Chakra from '@chakra-ui/react';

type PlacesViewProps = {
    places: Places;
    compiledPlaces: CompiledPlace[];
    visits: Visit[];
};

type Form = { name: string };

export const PlacesView = ({
    places,
    compiledPlaces,
    visits,
}: PlacesViewProps) => {
    const [propertyFilter, setPropertyFilter] = useState<string>('');
    const [propertyList, setPropertyList] = useState<PlaceSummary[]>([]);

    const {
        register,
        formState: { errors },
        watch,
    } = useForm<Form>({ mode: 'onChange' });

    useEffect(() => {
        const name = watch('name');

        setPropertyFilter(name);
    }, [watch('name')]);

    useEffect(() => {
        const list = places.placeSummaries
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
    }, [propertyFilter]);

    return places ? (
        <ContainerPage>
            <ContainerScrollBox>
                <Frame id='places-summary-frame'>
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
                            {places.placeSummaries
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
                                })
                                .map((summary) => {
                                    const compiledPlace:
                                        | CompiledPlace
                                        | undefined = (
                                        compiledPlaces || []
                                    ).find(
                                        (place) =>
                                            place.placeId === summary.placeId
                                    );

                                    const visited = (visits || []).filter(
                                        (visit) => {
                                            if (!visit) return false;
                                            return (
                                                visit.place.placeId ===
                                                summary.placeId
                                            );
                                        }
                                    );

                                    return (
                                        <PlaceCard
                                            key={summary.placeId}
                                            link={{
                                                href: `Places/${getCase(summary.name, 'pascal')}/${summary.placeId}`,
                                            }}
                                            summary={summary}
                                            place={compiledPlace}
                                            visited={
                                                visited
                                                    ? visited.length
                                                    : undefined
                                            }
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
                                label='Search Property Name'
                                formRegister={{ register }}
                                errors={errors}
                            />
                            <Chakra.Text>{`Showing ${propertyList.length} ${propertyList.length === 1 ? 'property' : 'properties'}`}</Chakra.Text>
                        </Chakra.GridItem>
                    </Chakra.Grid>
                </Frame>
            </ContainerScrollBox>
        </ContainerPage>
    ) : (
        <Spinner isPageSpinner />
    );
};
