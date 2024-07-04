'use client';

import { useEffect, useMemo, useState } from 'react';

import { useVisits } from '../../../library/context/Visits.context';

import { ReduceMapProps } from '../../../library/context/Visits.helpers';
import { getDateKeyFormat } from '../../../library/helpers/getDateKeyFormat.helper';
import { getAmountInPounds, getCase } from '../../../library/helpers';

import {
    Card,
    Frame,
    Icon,
    SelectGroup,
    Carousel,
    ChartProps,
    Chart,
} from '../../../library/components';

import { useDataFiltering } from '../../../library/hooks/useDataFiltering.hook';

import { CardMembership } from './CardMembership.component';
import { CardMonth } from './CardMonth.component';
import { CardYear } from './CardYear.component';
import { MembershipViewProps } from './Membership.definitions';

import '../../../library/prototypes/String.extensions';

// MARK: Types

type FormType = {
    year: string;
    month: string;
};

// MARK: Component

export const MembershipView = ({
    membership,
    nationalTrustData,
}: MembershipViewProps) => {
    const { visits, getStatistics } = useVisits();

    const {
        filters,
        form: {
            register,
            formState: { errors },
        },
        handleDataSelect,
        handleFilters,
        options,
    } = useDataFiltering();

    // MARK: State

    const [state, setState] = useState<{
        balance: number;
        month: string;
        monthAverageSpend: number;
        monthAverageVisits: number;
        monthSpend: number;
        monthVisits: number;
        totalSpend: number;
        totalYears: number;
        year: string;
        yearAverageSpend: number;
        yearMembershipPrice: number;
        yearSpend: number;
        yearVisits: number;
    }>({
        balance: 0,
        month: '',
        monthAverageSpend: 0,
        monthAverageVisits: 0,
        monthSpend: 0,
        monthVisits: 0,
        totalSpend: 0,
        totalYears: 0,
        year: '',
        yearAverageSpend: 0,
        yearMembershipPrice: 0,
        yearSpend: 0,
        yearVisits: 0,
    });

    // MARK: Memos

    const chartData = useMemo((): ChartProps['data'] => {
        const { year } = filters;

        const setByYear = getStatistics({ specificity: 'year' }) as Record<
            string,
            ReduceMapProps
        >;

        const yearKeys: (keyof typeof setByYear)[] = [
            ...Object.keys(setByYear),
        ];

        let total = membership.totalCost;

        const startOfYearTotals = yearKeys.reduce(
            (prev, current: string, index: number) => {
                if (index === 0) {
                    prev[current] = membership.totalCost;
                    total = total - setByYear[current]!.totalPrice;
                    return prev;
                }

                prev[current] = total;
                total = total - setByYear[current]!.totalPrice;
                return prev;
            },
            {} as Record<(typeof yearKeys)[number], number>
        );

        if (!year) {
            const labels = ['start', ...yearKeys].map((key) =>
                getCase(key, 'sentence').toCapitalisedCase()
            );
            const datasets = [
                {
                    label: 'Spend Depreciation',
                    data: ['start', ...yearKeys]
                        .reduce((array: number[], key: string) => {
                            if (key === 'start') {
                                array.push(membership.totalCost);
                                return array;
                            }

                            const lastItem = array[array.length - 1]!;
                            const value = lastItem - setByYear[key]!.totalPrice;
                            array.push(value);
                            return array;
                        }, [])
                        .map((total) => parseInt(getAmountInPounds(total))),
                },
            ];
            return { labels, datasets };
        }

        if (year) {
            const set = getStatistics({ specificity: 'month' }) as Record<
                string,
                ReduceMapProps
            >;
            const keys: (keyof typeof set)[] = [
                'start',
                ...Object.keys(set).filter((key) => key.includes(year)),
            ];
            const labels = keys.map((key) =>
                key.split('-')[0]!.toCapitalisedCase()
            );
            const datasets = [
                {
                    label: 'Total Spend',
                    data: keys
                        .reduce((array: number[], key: string) => {
                            if (key === 'start') {
                                array.push(startOfYearTotals[year]!);
                                return array;
                            }

                            const lastItem = array[array.length - 1]!;
                            const value = lastItem - set[key]!.totalPrice;
                            array.push(value);
                            return array;
                        }, [])
                        .map((total) => parseInt(getAmountInPounds(total))),
                },
            ];

            return {
                labels,
                datasets,
            };
        }

        return {
            labels: [],
            datasets: [],
        };
    }, [filters.year, visits]);

    const chartOptions = useMemo((): ChartProps['options'] => {
        const layout = {
            padding: 24,
        };

        return {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: `Spend Depreciation`,
                },
            },
            layout,
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    // @ts-ignore - missing properties that are not necessary but typed as required
                    title: {
                        display: true,
                        text: 'Pounds £',
                    },
                    grid: {
                        color: 'papayawhip',
                    },
                },
            },
        };
    }, []);

    // MARK: Effects

    useEffect(() => {
        const allStats = getStatistics() as ReduceMapProps;

        const monthStats = getStatistics({ specificity: 'month' }) as Record<
            string,
            ReduceMapProps
        >;

        const today = new Date();
        const date = today;

        const thisMonth = filters.month
            ? monthStats[filters.month]
            : monthStats[getDateKeyFormat(date)];

        const yearStats = getStatistics({ specificity: 'year' }) as Record<
            string,
            ReduceMapProps
        >;
        const thisYear = filters.year
            ? yearStats[filters.year]
            : yearStats[new Date().getFullYear()];

        const numberOfMonths = Object.keys(monthStats).length;
        const numberOfYears =
            new Date().getFullYear() -
            new Date(membership.startDate).getFullYear();

        setState((prev) => ({
            ...prev,
            month: filters.month,
            year: filters.year,
            balance: membership.totalCost - allStats.totalPrice,
            monthSpend: thisMonth?.totalPrice || 0,
            monthVisits: thisMonth?.visits || 0,
            yearSpend: thisYear?.totalPrice || 0,
            yearVisits: thisYear?.visits || 0,
            monthAverageSpend: thisYear
                ? Math.ceil(thisYear.totalPrice / numberOfMonths)
                : 0,
            monthAverageVisits: thisYear
                ? Math.ceil(thisYear.visits / numberOfMonths)
                : 0,
            yearAverageSpend: Math.ceil(allStats.totalPrice) / numberOfYears,
            totalYears: numberOfYears,
            totalSpend: allStats.totalPrice,
        }));
    }, [membership, filters, visits]);

    useEffect(() => {
        if (!filters.month) {
            const month = new Date().getMonth();
            const year = filters.year
                ? parseInt(filters.year)
                : new Date().getFullYear();

            handleFilters({
                month: getDateKeyFormat(new Date(year, month, 1)),
            });
        }
    }, [filters.year]);

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            yearMembershipPrice:
                nationalTrustData?.annualMembership[filters.year] ||
                nationalTrustData?.annualMembership[new Date().getFullYear()] ||
                0,
        }));
    }, [nationalTrustData, filters.year]);

    // MARK: Return

    return (
        <div className='flex flex-col'>
            <Frame
                id='membership-frame'
                colorScheme='black'
            >
                <div className='grid grid-cols-[1fr] md:grid-cols-[2fr_1fr] gap-16 w-full'>
                    <Card
                        divergent='solidOutline'
                        detail={
                            <h3 className='font-semibold'>
                                Membership: {membership.groupName}
                            </h3>
                        }
                    >
                        <div className='flex flex-row w-full justify-between gap-16 px-16'>
                            <div className='flex-1 p-16'>
                                <h2 className='flex flex-row gap-8 font-bold mb-16'>
                                    <Icon
                                        icon='people'
                                        ariaLabel='people'
                                    />
                                    <span>Members</span>
                                </h2>
                                <ul className='rounded-8 '>
                                    {membership.members.map((member) => (
                                        <li
                                            key={`members-${member.name}`}
                                            className='flex flex-row gap-8 align-center'
                                        >
                                            <Icon
                                                icon='user'
                                                ariaLabel='person'
                                            />
                                            {member.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='flex-2 rounded-8 bg-forest-300 p-16 flex flex-col gap-16'>
                                <h2 className='flex flex-row gap-8 font-bold mb-16'>
                                    <Icon
                                        icon='detail'
                                        ariaLabel='detail'
                                    />
                                    <span>Details</span>
                                </h2>
                                <div className='flex flex-row gap-8 items-center'>
                                    <Icon
                                        icon='clock'
                                        ariaLabel='clock'
                                        variant='outline'
                                    />
                                    <p className='font-semibold'>
                                        Number of years of membership:
                                    </p>
                                    <p>{state.totalYears}</p>
                                </div>
                                <div className='flex flex-row gap-8 items-center'>
                                    <Icon
                                        icon='calendar-event'
                                        ariaLabel='calendar event'
                                        variant='outline'
                                    />
                                    <p className='font-semibold'>Start date:</p>
                                    <p>{membership.startDate}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <div className='flex flex-row md:flex-col xl:flex-row gap-16'>
                        <SelectGroup<FormType, string>
                            formRegister={{
                                register,
                                options: { onChange: handleDataSelect },
                            }}
                            errors={errors}
                            name='month'
                            label='Month'
                            options={options.months.map((month) => [
                                month.split('-')[0]!,
                                month,
                            ])}
                        />
                        <SelectGroup<FormType, string>
                            formRegister={{
                                register,
                                options: { onChange: handleDataSelect },
                            }}
                            errors={errors}
                            name='year'
                            label='Year'
                            options={options.years}
                        />
                    </div>
                </div>
            </Frame>
            <Frame id='membership-carousel-frame'>
                <Carousel
                    visibleSlides={3}
                    isFullWidth
                >
                    <CardMembership
                        projection={Math.ceil(
                            state.balance / state.yearAverageSpend
                        )}
                        remainingBalance={state.balance}
                        savings={state.totalSpend}
                        totalPrice={membership.totalCost}
                    />
                    <CardMonth
                        month={state.month}
                        averageMonthSpend={state.monthAverageSpend}
                        averageVisits={state.monthAverageVisits}
                        numberOfVisits={state.monthVisits}
                        monthSpend={state.monthSpend}
                    />
                    <CardYear
                        year={state.year}
                        averageYearSpend={state.yearAverageSpend}
                        yearSpend={state.yearSpend}
                        membershipPrice={state.yearMembershipPrice}
                        numberOfVisits={state.yearVisits}
                    />
                </Carousel>
            </Frame>
            <Frame
                id='membership-heat-map-frame'
                className='[&>canvas]:bg-white-200 [&>canvas]:rounded-8'
                colorScheme='forest'
            >
                <Chart
                    type='line'
                    data={chartData}
                    options={chartOptions}
                />
            </Frame>
        </div>
    );
};
