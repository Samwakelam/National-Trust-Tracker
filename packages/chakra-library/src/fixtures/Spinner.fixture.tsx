// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox, Spinner } from '../components';
import { colorScheme } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';

const SpinnerFixture = () => {
    const [size] = useSelect('Size', {
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
        defaultValue: 'xl',
    });

    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'red',
    });

    const [isPageSpinner] = useValue<boolean>('Is Page Spinner', {
        defaultValue: true,
    });

    return (
        <FixtureBox>
            <Spinner
                size={size}
                color={scheme}
                isPageSpinner={isPageSpinner}
            />
        </FixtureBox>
    );
};
export default () => <SpinnerFixture />;
