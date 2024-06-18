// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';
import { useForm } from 'react-hook-form';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox, SwitchGroup, SwitchGroupProps } from '../components';
import { colorScheme } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';

const SwitchGroupFixture = ({
    track,
}: Omit<SwitchGroupProps<any>, 'formRegister' | 'errors' | 'name'>) => {
    const {
        register,
        formState: { errors },
    } = useForm<any>();

    const [tooltip] = useValue<boolean>('Add Tooltip', {
        defaultValue: false,
    });

    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'gray',
    });

    const [disabled] = useValue<boolean>('Is Disabled', {
        defaultValue: false,
    });

    const [variant] = useSelect('Variant', {
        options: ['solid', 'depth'],
        defaultValue: 'solid',
    });

    return (
        <FixtureBox hasPadding>
            <SwitchGroup<any>
                name='Switch'
                formRegister={{
                    register,
                }}
                errors={errors}
                label='Label'
                labelConfig={{
                    tooltip: tooltip ? { label: 'tooltip' } : undefined,
                }}
                switchConfig={{
                    colorScheme: scheme,
                    isDisabled: disabled,
                    variant,
                }}
                track={track}
            />
        </FixtureBox>
    );
};

export default {
    'Default Switch': () => <SwitchGroupFixture />,
    'Custom Track': () => (
        <SwitchGroupFixture
            track={{
                off: 'red.500',
                on: 'green.500',
            }}
        />
    ),
};
