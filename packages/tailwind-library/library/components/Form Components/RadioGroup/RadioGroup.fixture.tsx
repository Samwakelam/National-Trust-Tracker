'use client';

// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { useForm } from 'react-hook-form';

// Note: Full paths must be used in all files for cosmos to work

import { colorScheme } from '../../../utilities/colorScheme.util';

import { RadioGroup, RadioGroupProps } from './RadioGroup.component';

const RadioFixture = ({}) => {
    const [hideBadge] = useFixtureInput<boolean>('hideBadge', false);

    const [tooltip] = useFixtureInput<boolean>('Add Tooltip', false);

    const [isDisabled] = useFixtureInput<boolean>('Is Disabled', false);

    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    const {
        register,
        formState: { errors },
    } = useForm<any>();

    return (
        <div className='p-16'>
            <RadioGroup<any>
                colorScheme={colors as RadioGroupProps<any>['colorScheme']}
                name='Name'
                formRegister={{ register }}
                errors={errors}
                radios={[
                    {
                        label: 'Label',
                        value: '1',
                    },
                ]}
                isDisabled={isDisabled}
                // colorScheme={colors as RadioGroupProps['colorScheme']}
            />
        </div>
    );
};

export default RadioFixture;
