import React from 'react';

import { FixtureBox } from '../components';
import { Alert } from '../components/Alert/Alert.component';

const AlertFixture = () => {
    return (
        <FixtureBox hasPadding>
            <Alert
                status='warning'
                title='Alert'
                description='This is a description for the alert'
            />
        </FixtureBox>
    );
};

export default AlertFixture;
