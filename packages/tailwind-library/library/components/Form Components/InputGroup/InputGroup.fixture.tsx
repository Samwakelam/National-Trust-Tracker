'use client';
/* eslint-disable no-useless-computed-key */
// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { useForm } from 'react-hook-form';

import { colorScheme } from '../../../utilities/colorScheme.util';

import { Button } from '../../Button';

import { InputGroup, InputGroupProps } from './InputGroup.component';

// Note: Full paths must be used in all files for cosmos to work

const InputGroupFixture = () => {
    const [tooltip] = useFixtureInput<boolean>('Add Tooltip', false);

    const [colors] = useFixtureSelect('Colour Scheme', {
        options: Object.keys(colorScheme),
        defaultValue: 'slate',
    });

    const [hideBadge] = useFixtureInput<boolean>('Hide Badge', false);

    const [leftAddOn] = useFixtureInput<boolean>('Has Left addon', false);

    const [rightAddOn] = useFixtureInput<boolean>('Has Right addon', false);

    const [leftElement] = useFixtureInput<boolean>('Has Left Element', false);

    const [rightElement] = useFixtureInput<boolean>('Has Right Element', false);

    const [sudoErrors] = useFixtureInput<boolean>('Has Error', false);

    const [errorMessage] = useFixtureInput<string>('Set Error Message', '');

    const [isDisabled] = useFixtureInput<boolean>('Is Disabled', false);

    const [required] = useFixtureInput<boolean>('Is Required', false);

    const [type] = useFixtureSelect<React.HTMLInputTypeAttribute>('Type', {
        options: [
            'date',
            'datetime-local',
            'email',
            'month',
            'number',
            'password',
            'tel',
            'text',
            'time',
            'url',
            'week',
        ],
        defaultValue: 'text',
    });

    const {
        register,
        formState: { errors },
    } = useForm<any>();

    return (
        <div className='p-16'>
            <InputGroup<any>
                colorScheme={colors as InputGroupProps<any>['colorScheme']}
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
                addon={{
                    left: leftAddOn ? { children: 'addOn' } : undefined,
                    right: rightAddOn ? { children: 'addOn' } : undefined,
                }}
                element={{
                    left: leftElement
                        ? {
                              children: (
                                  <Button
                                      divergent='soft'
                                      size='sm'
                                  >
                                      Element
                                  </Button>
                              ),
                          }
                        : undefined,
                    right: rightElement
                        ? {
                              children: (
                                  <Button
                                      divergent='soft'
                                      size='sm'
                                  >
                                      Element
                                  </Button>
                              ),
                          }
                        : undefined,
                }}
                isDisabled={isDisabled}
                type={type}
            />
        </div>
    );
};

export default InputGroupFixture;
