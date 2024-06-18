import { useMemo } from 'react';
import { ScaleChartOptions, ChartDataset } from 'chart.js';

import { getAmountInPounds, getCase } from '../../../library/helpers';
import { ChartProps } from '../../../library/components';

import { ReduceMapProps } from '../../../library/context/Visits.helpers';

// MARK: Types

type UseStatisticsChartProps = {
    filters: {
        year: string;
        month: string;
        type: string;
    };
    groupedStats: Record<string, ReduceMapProps>;
    stats: ReduceMapProps;
};
// MARK: Hook

export const useStatisticsCharts = ({
    filters,
    groupedStats,
    stats,
}: UseStatisticsChartProps) => {
    // MARK: Chart Data
    const chartData = useMemo((): ChartProps['data'] => {
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

    // MARK: Chart Options
    const chartOptions = useMemo((): ChartProps['options'] => {
        const { type, year, month } = filters;

        const singleScale: ScaleChartOptions<'line'>['scales'] = {
            y: {
                type: 'linear',
                position: 'left',
                // @ts-ignore - missing properties that are not necessary but typed as required
                title: {
                    display: true,
                    text: 'Quantity',
                    align: 'center',
                    padding: 0,
                },
                grid: {
                    color: 'pink',
                },
            },
        };

        const twoScales: ScaleChartOptions<'line'>['scales'] = {
            y: singleScale.y!,
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
                scales: twoScales,
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
                scales: singleScale,
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
            scales: singleScale,
        };
    }, [filters]);

    // MARK: Return

    return { chartData, chartOptions };
};
