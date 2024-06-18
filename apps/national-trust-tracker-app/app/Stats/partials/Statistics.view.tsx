'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useVisits } from '../../../library/context/Visits.context';
import { ReduceMapProps } from '../../../library/context/Visits.helpers';
import { Membership } from '../../../library/types/internal';
import { getAmountInPounds } from '../../../library/helpers';

import {
    Card,
    Chart,
    Frame,
    Icon,
    SelectGroup,
} from '../../../library/components';

import { CarouselStatistics } from './CarouselStatistics.component';

import '../../../library/prototypes/String.extensions';
import { useStatisticsCharts } from './useStatisticsCharts.hook';
import { useDataFiltering } from '../../useDataFiltering.hook';

// MARK: Types

export type StatisticsViewProps = {
    membership: Membership;
};

type FormType = {
    year: string;
    month: string;
};

// MARK: Component

export const StatisticsView = ({ membership }: StatisticsViewProps) => {
    const { getStatistics } = useVisits();

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

    const { chartData, chartOptions } = useStatisticsCharts({
        filters,
        stats,
        groupedStats,
    });

    // MARK: Effects

    useEffect(function init() {
        const yearStats = getStatistics({ specificity: 'year' }) as Record<
            string,
            ReduceMapProps
        >;
        setGroupedStats(yearStats);
    }, []);

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

    // MARK: Return

    return (
        <div
            data-label='statistics-view'
            className=''
        >
            <Frame
                id='pricing-stats'
                colorScheme='black'
            >
                <div className='grid grid-cols-[1fr] md:grid-cols-[2fr_1fr] gap-16 w-full'>
                    <Card
                        divergent='solidOutline'
                        detail={
                            <h3 className='font-semibold'>Pricing Stats</h3>
                        }
                        colorScheme='slate'
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
            <Frame id='carousel-frame'>
                <CarouselStatistics
                    statsSet={stats}
                    membership={membership}
                    onTypeSelect={(type) => handleFilters({ type })}
                    selectedType={filters.type}
                />
            </Frame>
            <Frame
                id='chart-frame'
                className='[&>canvas]:bg-white-200 [&>canvas]:rounded-8'
                colorScheme='forest'
            >
                <Chart
                    type={filters.type ? 'bar' : 'bar'}
                    data={chartData}
                    options={chartOptions}
                />
            </Frame>
        </div>
    );
};

// data-label='' className=''
