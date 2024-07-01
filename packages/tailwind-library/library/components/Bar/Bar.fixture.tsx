'use client';

import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { Bar, BarProps } from './Bar.component';
import { colorScheme } from '../../utilities/colorScheme.util';

const divergents: Exclude<BarProps['divergent'], undefined | null>[] = [
    'default',
];

const BarFixture = () => {
    const [hasCta] = useFixtureInput('Add Cta', false);
    const cta: BarProps['cta'] = { onClick: () => alert('Cta Clicked') };

    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    return (
        <Bar
            colorScheme={colors as BarProps['colorScheme']}
            cta={hasCta ? cta : undefined}
        >
            <h1>I am a basic bar</h1>
        </Bar>
    );
};

export default BarFixture;
