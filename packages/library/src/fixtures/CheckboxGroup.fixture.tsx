// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';
import { useForm } from 'react-hook-form';

// Note: Full paths must be used in all files for cosmos to work
import { CheckboxGroup, FixtureBox } from '../components';
import { colorScheme } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';

const CheckboxFixture = ({}) => {
    const [hideBadge] = useValue<boolean>('hideBadge', {
        defaultValue: false,
    });

    const [tooltip] = useValue<boolean>('Add Tooltip', {
        defaultValue: false,
    });

    const [disabled] = useValue<boolean>('Is Disabled', {
        defaultValue: false,
    });

    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'gray',
    });

    const {
        register,
        formState: { errors },
    } = useForm<any>();

    return (
        <FixtureBox hasPadding>
            <CheckboxGroup<any>
                name='Name'
                formRegister={{ register }}
                errors={errors}
                label='Label'
                checkboxConfig={{
                    isDisabled: disabled,
                    colorScheme: scheme,
                }}
                labelConfig={{
                    hideBadge: hideBadge,
                    tooltip: tooltip ? { label: 'tooltip' } : undefined,
                }}
            />
        </FixtureBox>
    );
};

export default CheckboxFixture;
