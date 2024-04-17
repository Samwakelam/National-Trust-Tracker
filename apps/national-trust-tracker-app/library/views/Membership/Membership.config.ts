import { ChartData, ChartOptions } from 'chart.js';

import { MembershipChartType } from './Membership.definitions';

export const chartOptionsConfig: Record<
    MembershipChartType,
    ChartOptions<'line'>
> = {
    ticket: {
        responsive: true,
        scales: {
            axisOne: {
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Units',
                },
                beginAtZero: true,
            },
            axisTwo: {
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Pounds',
                },
                beginAtZero: true,
            },
        },
    },
    price: {
        responsive: true,
    },
};
