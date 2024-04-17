'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    Chart,
    ContainerScrollBox,
    ContainerPage,
    Frame,
    getCase,
    Heading,
    Card,
    Icon,
    IconProps,
    Button,
} from '@sam/library';

import { useVisits } from '../../hooks/useVisits';
import { Membership, Person, Visit } from '../../types/internal';
import { resolveIcon } from '../../helpers';

import { useStatisticsCharts } from './Statistics.hooks';

import * as Chakra from '@chakra-ui/react';

export type StatisticsViewProps = {
    visits: Visit[];
    membership: Membership;
};

type FavouritesState = {
    place: string;
    travel: string;
    people: (Person & { visits: number })[];
    region: string;
};

export const StatisticsView = ({ visits, membership }: StatisticsViewProps) => {
    const { getAll, getByYear, getByMonth } = useVisits({
        visits,
    });

    const [favourites, setFavourites] = useState<FavouritesState>({
        place: '',
        travel: '',
        people: [],
        region: '',
    });

    const [filterByDate, setFilterStats] = useState<string>('');

    const {
        assetsChart,
        facilitiesChart,
        placesChart,
        regionsChart,
        travelChart,
    } = useStatisticsCharts({ visits, filterByDate });

    const years = useMemo(() => {
        return Object.keys(getByYear().visits);
    }, [visits]);

    const stats = useMemo(() => {
        const all = getAll(filterByDate).statistics;

        return all;
    }, [visits, filterByDate]);

    const handleFilterDates = (date: string) => {
        if (date === filterByDate) {
            setFilterStats('');
        } else {
            setFilterStats(date);
        }
    };

    useEffect(() => {
        const members = membership.members.map((member) =>
            member.name.toLowerCase()
        );

        const place = Object.keys(stats.places).reduce((a, b) => {
            //@ts-ignore - strict
            return stats.places[a] > stats.places[b] ? a : b;
        });
        const travel = Object.keys(stats.travel).reduce((a, b) => {
            //@ts-ignore - strict
            return stats.travel[a] > stats.travel[b] ? a : b;
        });
        const people = Object.keys(stats.people).reduce(
            (prev: FavouritesState['people'], person) => {
                if (!members.includes(person) && person !== 'together') {
                    prev.push({
                        name: person,
                        visits: stats.people[person] || 0,
                    });
                }
                return prev;
            },
            []
        );
        const region = Object.keys(stats.regions).reduce((a, b) => {
            //@ts-ignore - strict
            return stats.regions[a] > stats.regions[b] ? a : b;
        });

        setFavourites((prev) => ({
            ...prev,
            place,
            travel,
            people,
            region,
        }));
    }, [stats]);

    return (
        <ContainerPage>
            <ContainerScrollBox>
                <Chakra.Grid gridTemplateColumns={['1fr', '4fr 1fr']}>
                    <Chakra.GridItem>
                        <Frame id='statistics-frame'>
                            <Chakra.Flex
                                gap={16}
                                flexWrap='wrap'
                                justifyContent='center'
                            >
                                <CardStatistic
                                    icon={{
                                        icon: 'heart-together',
                                        ariaLabel: 'heart holding hands',
                                    }}
                                    heading='Visited Together'
                                    value={stats.people.together || 'unknown'}
                                />

                                {favourites.people.map((person) => {
                                    return (
                                        <CardStatistic
                                            key={`card-stat-people-${person.name}`}
                                            icon={{
                                                icon: 'user',
                                                ariaLabel: 'person',
                                                variant: 'outline',
                                            }}
                                            heading={`Visits With`}
                                            value={`${person.name.toCapitalisedCase()} ${person.visits} times`}
                                        />
                                    );
                                })}
                            </Chakra.Flex>
                        </Frame>
                        <Frame id='statistics-frame-places'>
                            <Heading preset='frame-heading'>Places</Heading>
                            <Chakra.Grid
                                gridTemplateColumns={['1fr', '1fr 1fr']}
                                columnGap={32}
                                rowGap={20}
                                w='100%'
                            >
                                <Chakra.GridItem
                                    display='flex'
                                    flexDirection='column'
                                    gap={32}
                                >
                                    <Card
                                        h='100%'
                                        w='100%'
                                        colorScheme='white'
                                        flexGrow={1}
                                    >
                                        <Chart {...placesChart} />
                                    </Card>
                                    <Card
                                        h='100%'
                                        w='100%'
                                        colorScheme='white'
                                        flex={1}
                                    >
                                        <Chart {...regionsChart} />
                                    </Card>
                                </Chakra.GridItem>
                                <Chakra.GridItem
                                    display='flex'
                                    flexDirection='column'
                                    justifyContent='center'
                                    gap={32}
                                >
                                    <CardStatistic
                                        icon={{
                                            icon: 'location-heart',
                                            ariaLabel:
                                                'location pin with heart',
                                        }}
                                        heading=' Favourite place'
                                        value={getCase(
                                            favourites.place,
                                            'sentence'
                                        ).toCapitalisedCase()}
                                    />
                                    <CardStatistic
                                        icon={{
                                            icon: 'map-heart',
                                            ariaLabel: 'map with heart',
                                        }}
                                        heading='Favourite Region'
                                        value={getCase(
                                            favourites.region,
                                            'sentence'
                                        ).toCapitalisedCase()}
                                    />
                                </Chakra.GridItem>
                            </Chakra.Grid>
                        </Frame>

                        <Frame
                            id='statistics-frame-assets-and-facilities'
                            colorScheme='gray'
                        >
                            <Heading preset='frame-heading'>
                                Assets and Facilities
                            </Heading>
                            <Chakra.Grid
                                gridTemplateColumns={['1fr', '1fr 1fr']}
                                columnGap={32}
                                rowGap={20}
                                w='100%'
                            >
                                <Chakra.GridItem
                                    display='flex'
                                    flexDirection='column'
                                    gap={32}
                                >
                                    <Chakra.Flex
                                        gap={20}
                                        flexWrap='wrap'
                                        justifyContent='center'
                                    >
                                        {Object.keys(stats.assets).map(
                                            (key) => {
                                                return (
                                                    <CardStatistic
                                                        key={`card-statistic-assets-${key}`}
                                                        icon={getAssetsIcon(
                                                            key
                                                        )}
                                                        heading={`${getCase(key, 'sentence').toCapitalisedCase()}s Visited`}
                                                        value={
                                                            stats.assets[
                                                                key
                                                            ] as number
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </Chakra.Flex>
                                </Chakra.GridItem>
                                <Chakra.GridItem
                                    display='flex'
                                    flexDirection='column'
                                    gap={32}
                                >
                                    <Card
                                        w='100%'
                                        colorScheme='white'
                                    >
                                        <Chart {...assetsChart} />
                                    </Card>
                                    <Card
                                        w='100%'
                                        colorScheme='white'
                                    >
                                        <Chart {...facilitiesChart} />
                                    </Card>
                                </Chakra.GridItem>
                            </Chakra.Grid>
                        </Frame>

                        <Frame id='statistics-frame-travel'>
                            <Heading preset='frame-heading'>Travel</Heading>
                            <CardStatistic
                                icon={
                                    resolveIcon(favourites.travel) || {
                                        icon: 'route',
                                        ariaLabel: 'route',
                                    }
                                }
                                heading='Favourite way to travel'
                                value={getCase(
                                    favourites.travel,
                                    'sentence'
                                ).toCapitalisedCase()}
                            />
                            <Card
                                h='100%'
                                w='100%'
                                colorScheme='white'
                            >
                                <Chart {...travelChart} />
                            </Card>
                        </Frame>
                    </Chakra.GridItem>
                    <Chakra.GridItem
                        bg='black.200'
                        position='sticky'
                        height='calc(100vh - 116px)'
                        top='0'
                        bottom='0'
                        paddingY={60}
                        paddingX={16}
                        display='flex'
                        flexDirection='column'
                        gap={16}
                    >
                        {years.map((year) => {
                            return (
                                <Button
                                    key={year}
                                    width='100%'
                                    colorScheme='white'
                                    isActive={filterByDate === year}
                                    onClick={() => handleFilterDates(year)}
                                >
                                    {year}
                                </Button>
                            );
                        })}
                    </Chakra.GridItem>
                </Chakra.Grid>
            </ContainerScrollBox>
        </ContainerPage>
    );
};

type CardStatisticProps = {
    icon: IconProps;
    heading: string;
    value: string | number;
};

const CardStatistic = ({ icon, heading, value }: CardStatisticProps) => {
    return (
        <Card colorScheme='white'>
            <Chakra.Flex
                direction='column'
                alignItems='center'
                gap={8}
            >
                <Icon
                    boxSize={32}
                    m={16}
                    {...icon}
                />
                <Heading preset='sub-heading'>{heading}</Heading>
                <Chakra.Text>{value}</Chakra.Text>
            </Chakra.Flex>
        </Card>
    );
};

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
