// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox, Label } from '../components';

import * as Chakra from '@chakra-ui/react';

const LabelFixture = ({}) => {
    const [tooltip] = useValue<boolean>('Add Tooltip', {
        defaultValue: false,
    });

    const [required] = useValue<boolean>('isRequired', {
        defaultValue: false,
    });

    const [hideBadge] = useValue<boolean>('hideBadge', {
        defaultValue: false,
    });

    const [display] = useSelect('Display', {
        options: ['stack', 'linear'],
        defaultValue: 'linear',
    });

    return (
        <FixtureBox
            hasPadding
            gap='1rem'
        >
            <Label
                isRequired={required}
                label='Label'
                hideBadge={hideBadge}
                tooltip={tooltip ? { label: 'tooltip' } : undefined}
                htmlFor='label'
                display={display}
            />
            <Label
                isRequired={required}
                label='A Long Label'
                hideBadge={hideBadge}
                tooltip={tooltip ? { label: 'tooltip' } : undefined}
                htmlFor='label'
                display={display}
            />
            <Label
                isRequired={required}
                label='A Long Label'
                hideBadge={hideBadge}
                tooltip={tooltip ? { label: 'tooltip' } : undefined}
                htmlFor='label'
                display={display}
                addBadge={[
                    {
                        colorScheme: 'green',
                        children: 'extra badge',
                    },
                ]}
            />
        </FixtureBox>
    );
};

export default LabelFixture;
