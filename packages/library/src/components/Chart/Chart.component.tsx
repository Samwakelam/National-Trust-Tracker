import React, { ReactElement } from 'react';
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Chart as ChartJS,
    registerables,
} from 'chart.js';
import { Chart as ReactChart } from 'react-chartjs-2';
import { ChartProps as ReactChartProps } from 'react-chartjs-2/dist/types';

ChartJS.register(
    ...registerables,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import * as Chakra from '@chakra-ui/react';

export type ChartProps = ReactChartProps;

export const Chart = ({
    type,
    data,
    options = { responsive: true },
}: ChartProps): ReactElement<ChartProps> => {
    return (
        <ReactChart
            type={type}
            data={data}
            options={options}
        />
    );
};
