'use client';
/* eslint-disable no-useless-computed-key */
// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { useForm } from 'react-hook-form';

import { colorScheme } from '../../../utilities/colorScheme.util';

import { TextareaGroup, TextareaGroupProps } from './TextareaGroup.component';

// Note: Full paths must be used in all files for cosmos to work

const TextareaGroupFixture = () => {
    const [tooltip] = useFixtureInput<boolean>('Add Tooltip', false);

    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    const [hideBadge] = useFixtureInput<boolean>('Hide Badge', false);

    const [sudoErrors] = useFixtureInput<boolean>('Has Error', false);

    const [errorMessage] = useFixtureInput<string>('Set Error Message', '');

    const [isDisabled] = useFixtureInput<boolean>('Is Disabled', false);

    const [required] = useFixtureInput<boolean>('Is Required', false);

    const {
        register,
        formState: { errors },
    } = useForm<any>();

    return (
        <div className='p-16'>
            <TextareaGroup<any>
                colorScheme={colors as TextareaGroupProps<any>['colorScheme']}
                name='Name'
                formRegister={{
                    register,
                    options: {
                        required: errorMessage ? errorMessage : required,
                    },
                }}
                errors={
                    sudoErrors
                        ? { Name: { type: '', message: errorMessage } }
                        : errors
                }
                label='Label'
                labelConfig={{
                    hideBadge: hideBadge,
                    tooltips: tooltip
                        ? [{ label: 'tooltip', status: 'info' }]
                        : undefined,
                }}
                isDisabled={isDisabled}
            />
        </div>
    );
};

export default TextareaGroupFixture;
