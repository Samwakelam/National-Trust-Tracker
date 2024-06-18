'use client';

import React, { useMemo } from 'react';

import { data as mockData } from './Chart.utils';
import { Chart } from './Chart.component';

const ChartFixture = () => {
    const data = useMemo(() => {
        return {
            labels: mockData.map((_data) => _data.year),
            datasets: [
                {
                    label: 'Users Gained',
                    data: mockData.map((_data) => _data.userGain),
                },
            ],
        };
    }, [mockData]);

    return (
        <div className='p-16'>
            <Chart
                data={data}
                type='line'
            />
        </div>
    );
};

export default ChartFixture;
