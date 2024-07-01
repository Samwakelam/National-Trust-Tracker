'use client';

// Note: React must be declared in all files for cosmos to work
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Note: Full paths must be used in all files for cosmos to work
import { SelectGroup, SelectGroupProps } from '..';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { colorScheme } from '../../../utilities/colorScheme.util';

const SelectGroupFixture = () => {
    const {
        register,
        formState: { errors },
    } = useForm<any>();

    const [value, setValue] = useState<string | undefined>(undefined);

    const options = ['Option - 1', 'Option - 2', 'Option - 3'];

    // MARK: Inputs

    const [canFilter] = useFixtureInput<boolean>('Can Filter', false);

    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    // const [defaultValue] = useFixtureSelect('Default Value', {
    //     options,
    // });

    const [hideBadge] = useFixtureInput<boolean>('Hide Badge', false);

    const [required] = useFixtureInput<boolean>('Is Required', false);

    const [isDisabled] = useFixtureInput<boolean>('Is Disabled', false);

    const [tooltip] = useFixtureInput<boolean>('Add Tooltip', false);

    // MARK: Return
    return (
        <div className='p-16 g-32'>
            <SelectGroup<any, string>
                name='Name'
                formRegister={{
                    register,
                    options: { required },
                }}
                errors={errors}
                colorScheme={
                    colors as SelectGroupProps<any, string>['colorScheme']
                }
                label='Label'
                labelConfig={{
                    hideBadge: hideBadge,
                    tooltips: tooltip
                        ? [{ label: 'tooltip', status: 'info' }]
                        : undefined,
                }}
                options={options}
                canFilter={canFilter}
                isDisabled={isDisabled}
                // defaultValue={defaultValue}
            />
            <p>Value: {value}</p>
        </div>
    );
};

export default SelectGroupFixture;
