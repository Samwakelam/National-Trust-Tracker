'use client';

import { useFixtureSelect } from 'react-cosmos/client';
import { Spinner, SpinnerProps } from './Spinner.component';
import { colorScheme } from '../../utilities/colorScheme.util';

const SpinnerFixture = () => {
    const [colors] = useFixtureSelect('Color Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    const [size] = useFixtureSelect('Size', {
        options: ['sm', 'md', 'lg', 'xl'],
        defaultValue: 'sm',
    });

    return (
        <div className='flex flex-row w-full h-full justify-center items-center'>
            <Spinner
                size={size}
                colorScheme={colors as SpinnerProps['colorScheme']}
            />
        </div>
    );
};

export default SpinnerFixture;
