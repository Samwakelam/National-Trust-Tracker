import React, { useMemo } from 'react';

import { FixtureBox } from '../components';
import { Chart, data as mockData } from '../components/Chart';

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
        <FixtureBox hasPadding>
            <Chart
                data={data}
                type='line'
            />
        </FixtureBox>
    );
};

export default ChartFixture;
