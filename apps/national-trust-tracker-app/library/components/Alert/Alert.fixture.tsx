'use client';

import React from 'react';

import { Alert, AlertProps } from './Alert.component';
import { useFixtureSelect } from 'react-cosmos/client';

const divergents: Exclude<AlertProps['divergent'], undefined | null>[] = [
    'soft',
    'solid',
];

const statuses: Exclude<AlertProps['status'], undefined | null>[] = [
    'error',
    'info',
    'success',
    'warning',
];

const AlertFixture = () => {
    const [divergent] = useFixtureSelect('Divergent', {
        options: divergents,
        defaultValue: 'solid',
    });

    const [status] = useFixtureSelect('Status', {
        options: statuses,
        defaultValue: 'success',
    });

    return (
        <Alert
            divergent={divergent}
            description={'A Basic Alert Description'}
            heading={'Heading'}
            status={status}
        />
    );
};

export default AlertFixture;
