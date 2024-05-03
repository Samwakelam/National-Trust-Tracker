'use client';

// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useForm } from 'react-hook-form';

// Note: Full paths must be used in all files for cosmos to work

import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { colorScheme } from '../../../utilities/colorScheme.util';
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup.component';

const CheckboxFixture = ({}) => {
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
            <CheckboxGroup<any>
                colorScheme={colors as CheckboxGroupProps<any>['colorScheme']}
                name='Name'
                formRegister={{ register }}
                errors={errors}
                checkboxes={[
                    {
                        label: 'Label',
                        labelConfig: {
                            hideBadge: hideBadge,
                            tooltips: tooltip
                                ? [{ label: 'tooltip', status: 'info' }]
                                : undefined,
                        },
                    },
                ]}
                isChecked={[]}
                isDisabled={isDisabled}
                // colorScheme={colors as CheckboxGroupProps['colorScheme']}
            />
        </div>
    );
};

export default CheckboxFixture;
