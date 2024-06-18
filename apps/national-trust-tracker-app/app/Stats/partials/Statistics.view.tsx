'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScaleChartOptions, ChartDataset } from 'chart.js';

import { useVisits } from '../../../library/context/Visits.context';
import { ReduceMapProps } from '../../../library/context/Visits.helpers';
import { Membership } from '../../../library/types/internal';
import { getAmountInPounds, getCase } from '../../../library/helpers';

import {
    Card,
    Chart,
    ChartProps,
    Frame,
    Icon,
    SelectGroup,
} from '../../../library/components';

import { CarouselStatistics } from './CarouselStatistics.component';

import '../../../library/prototypes/String.extensions';

// MARK: Types

export type StatisticsViewProps = {
    membership: Membership;
};

export type FormType = {
    year: string;
    month: string;
};

// MARK: Component

export const StatisticsView = ({ membership }: StatisticsViewProps) => {
    const { getStatistics } = useVisits();

    // MARK: Form

    const {
        register,
        formState: { errors },
        setValue,
    } = useForm<FormType>({
        mode: 'onChange',
        defaultValues: { month: '', year: '' },
    });

    // MARK: State
    const [options, setOptions] = useState<{
        years: string[];
        months: string[];
    }>({ months: [''], years: [''] });

    const [filters, setFilters] = useState<{
        year: string;
        month: string;
        type: string;
    }>({
        year: '',
        month: '',
        type: '',
    });

    const [stats, setStats] = useState<ReduceMapProps>({
        assets: {},
        facilities: {},
        people: {},
        places: {},
        regions: {},
        tickets: {},
        totalPrice: 0,
        totalTickets: 0,
        travel: {},
        visits: 0,
    });
    const [groupedStats, setGroupedStats] = useState<
        Record<string, ReduceMapProps>
    >({});

    // MARK: Memos

    const data = useMemo((): ChartProps['data'] => {
        const { type, year, month } = filters;

        if (!year && !month && !type) {
            const set = groupedStats;
            const keys: (keyof typeof set)[] = Object.keys(set);
            const labels = keys.map((key) =>
                getCase(key, 'sentence').toCapitalisedCase()
            );

            const _sets: (keyof ReduceMapProps)[] = ['visits', 'totalTickets'];

            const yDatasets: ChartDataset[] = _sets.map((_set, index) => {
                return {
                    label: getCase(_set, 'sentence').toCapitalisedCase(),
                    data: keys.map((key) => set[key]![_set] as number),
                    yAxisID: 'y',
                };
            });

            const y2Datasets: ChartDataset[] = [
                {
                    label: 'Total Spend £',
                    data: keys.map((key) =>
                        parseFloat(getAmountInPounds(set[key]!.totalPrice))
                    ),
                    yAxisID: 'y2',
                    type: 'line',
                },
            ];

            return {
                labels,
                datasets: [...yDatasets, ...y2Datasets],
            };
        }

        if (year && !month && !type) {
            const set = groupedStats;
            const keys: (keyof typeof set)[] = Object.keys(set);
            const labels = keys.map((key) => key.split('-')[0]);

            const _sets: (keyof ReduceMapProps)[] = ['visits', 'totalTickets'];

            const yDatasets: ChartDataset[] = _sets.map((_set, index) => {
                return {
                    label: getCase(_set, 'sentence').toCapitalisedCase(),
                    data: keys.map((key) => set[key]![_set] as number),
                    yAxisID: 'y',
                };
            });

            const y2Datasets: ChartDataset[] = [
                {
                    label: 'Total Spend £',
                    data: keys.map((key) =>
                        parseFloat(getAmountInPounds(set[key]!.totalPrice))
                    ),
                    yAxisID: 'y2',
                    type: 'line',
                },
            ];

            return {
                labels,
                datasets: [...yDatasets, ...y2Datasets],
            };
        }

        if (year && month && !type) {
            const set = stats;

            const keys: (keyof ReduceMapProps)[] = ['visits', 'totalTickets'];
            const labels = keys.map((key) =>
                getCase(key, 'sentence').toCapitalisedCase()
            );

            const datasets = [
                {
                    data: keys.map((key) => set[key] as number),
                    yAxisID: 'y',
                },
            ];

            return {
                labels,
                datasets,
            };
        }

        if (type) {
            const set = stats[type as keyof ReduceMapProps];
            const keys = Object.keys(set);
            const labels = keys.map((key) =>
                getCase(key, 'sentence').toCapitalisedCase()
            );

            const datasets = [
                {
                    data: keys.map(
                        (key) => set[key as keyof typeof set] as number
                    ),
                    yAxisID: 'y',
                    label: getCase(type, 'sentence').toCapitalisedCase(),
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
    }, [stats, groupedStats, filters.type]);

    const chartOptions = useMemo((): ChartProps['options'] => {
        const { type, year, month } = filters;

        const scales: ScaleChartOptions<'line'>['scales'] = {
            y: {
                type: 'linear',
                position: 'left',
                // @ts-ignore - missing properties that are not necessary but typed as required
                title: {
                    display: true,
                    text: 'Visits and Tickets',
                    align: 'center',
                    padding: 0,
                },
                grid: {
                    color: 'pink',
                },
            },
            y2: {
                type: 'linear',
                position: 'right',
                // @ts-ignore - missing properties that are not necessary but typed as required
                title: {
                    display: true,
                    text: 'Total Spend £',
                },
                grid: {
                    color: 'papayawhip',
                },
            },
        };

        const layout = {
            padding: 24,
        };

        if (!month && !type) {
            return {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    title: {
                        display: true,
                        text: year ? `Totals for ${year}` : `Totals`,
                    },
                },
                layout,
                scales,
            };
        }

        if (month && !type) {
            return {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: year
                            ? `Totals for ${month.split('-')[0]} ${year}`
                            : `Totals`,
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
                            text: 'Visits and Tickets',
                            align: 'center',
                            padding: 0,
                        },
                        grid: {
                            color: 'pink',
                        },
                    },
                },
            };
        }

        return {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: `${getCase(type, 'sentence').toCapitalisedCase()} - ${month && `${month.split('-')[0]} `}${year}`,
                },
            },
            layout,
            scales,
        };
    }, [filters]);

    // MARK: Handlers

    const handleDataSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name;

        const value = e.target.value;

        if (name === 'month') {
            setFilters((prev) => ({ ...prev, month: value }));
        }

        if (name === 'month' && value && !filters.year) {
            const year = value.split('-')[1]!;
            setValue('year', year, { shouldValidate: true });
        }

        if (name === 'year' && value) {
            const months = getMonthOptions(value);
            setFilters((prev) => ({ ...prev, year: value }));
            setOptions((prev) => ({ ...prev, months }));
        }

        if (name === 'year' && !value) {
            const months =
                options.years.length === 1
                    ? getMonthOptions(options.years[0])
                    : [];

            setFilters((prev) => ({ ...prev, month: value, year: value }));
            setOptions((prev) => ({ ...prev, months }));
            setValue('month', value, { shouldValidate: true });
        }
    };

    const getMonthOptions = (year?: string) => {
        const monthStats = getStatistics({ specificity: 'month' }) as Record<
            string,
            ReduceMapProps
        >;

        if (year) {
            return Object.keys(monthStats).filter((month) =>
                month.includes(year)
            );
        }

        if (!year && filters.year) {
            return Object.keys(monthStats).filter((month) =>
                month.includes(filters.year)
            );
        }

        return [];
    };

    // MARK: Effects

    useEffect(() => {
        const { year, month } = filters;

        const allStats = getStatistics() as ReduceMapProps;

        const monthStats = getStatistics({
            specificity: 'month',
            date: year,
        }) as Record<string, ReduceMapProps>;

        const yearStats = getStatistics({
            specificity: 'year',
            date: year,
        }) as Record<string, ReduceMapProps>;

        if (year && !month) {
            setStats(yearStats[year]!);
            setGroupedStats(monthStats);
        }

        if (year && month) {
            setStats(monthStats[month]!);
        }

        if (!year && !month) {
            setStats(allStats);
            setGroupedStats(yearStats);
        }
    }, [filters]);

    useEffect(function init() {
        const yearStats = getStatistics({ specificity: 'year' }) as Record<
            string,
            ReduceMapProps
        >;

        const years = Object.keys(yearStats);

        const months = years.length === 1 ? getMonthOptions(years[0]) : [];

        setOptions((prev) => ({
            ...prev,
            years,
            months,
        }));

        setGroupedStats(yearStats);
    }, []);

    // MARK: Return

    return (
        <div
            data-label='statistics-view'
            className=''
        >
            <Frame id='pricing-stats'>
                <div className='grid grid-cols-[2fr_1fr] gap-16 w-full'>
                    <Card
                        divergent='solidOutline'
                        detail={
                            <h3 className='font-semibold'>Pricing Stats</h3>
                        }
                    >
                        <div className='flex flex-row gap-8 items-center'>
                            <Icon
                                icon='ticket'
                                ariaLabel='tickets'
                            />
                            <p>Number of Tickets: </p>
                            <p>{stats.totalTickets}</p>
                        </div>

                        <div className='flex flex-row gap-8 items-center'>
                            <Icon
                                icon='money-report'
                                ariaLabel='report'
                            />
                            <p>Spent: </p>
                            <p>{`£${getAmountInPounds(stats.totalPrice)}`}</p>
                        </div>

                        <div className='flex flex-row gap-8 items-center'>
                            <Icon
                                icon='money-report'
                                ariaLabel='report'
                            />
                            <p>Average per ticket: </p>
                            <p>{`£${getAmountInPounds(Math.floor(stats.totalPrice / stats.totalTickets))}`}</p>
                        </div>
                    </Card>
                    <div className='flex flex-row gap-16'>
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
            <Frame id='carousel-frame'>
                <CarouselStatistics
                    statsSet={stats}
                    membership={membership}
                    onTypeSelect={(type) =>
                        setFilters((prev) => ({ ...prev, type }))
                    }
                    selectedType={filters.type}
                />
            </Frame>
            <Frame
                id='chart-frame'
                colorScheme='pink'
                className='[&>canvas]:bg-white-200 [&>canvas]:rounded-8'
            >
                <Chart
                    type={filters.type ? 'bar' : 'bar'}
                    data={data}
                    options={chartOptions}
                />
            </Frame>
        </div>
    );
};

// data-label='' className=''
