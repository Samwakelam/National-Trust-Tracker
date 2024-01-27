/* eslint-disable no-useless-computed-key */
// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';
import { useForm } from 'react-hook-form';

// Note: Full paths must be used in all files for cosmos to work
import { Button, FixtureBox, InputGroup, InputGroupProps } from '../components';

import * as Chakra from '@chakra-ui/react';

const InputGroupFixture = ({
    element,
}: Omit<InputGroupProps<any>, 'formRegister' | 'errors' | 'name'>) => {
    const [tooltip] = useValue<boolean>('Add Tooltip', {
        defaultValue: false,
    });

    const [hideBadge] = useValue<boolean>('Hide Badge', {
        defaultValue: false,
    });

    const [leftAddOn] = useValue<boolean>('Has Left addon', {
        defaultValue: false,
    });

    const [rightAddOn] = useValue<boolean>('Has Right addon', {
        defaultValue: false,
    });

    const [leftElement] = useValue<boolean>('Has Left Element', {
        defaultValue: false,
    });

    const [rightElement] = useValue<boolean>('Has Right Element', {
        defaultValue: false,
    });

    const [sudoErrors] = useValue<boolean>('Has Error', {
        defaultValue: false,
    });

    const [errorMessage] = useValue<string>('Set Error Message', {
        defaultValue: '',
    });

    const [disabled] = useValue<boolean>('Is Disabled', {
        defaultValue: false,
    });

    const [required] = useValue<boolean>('Is Required', {
        defaultValue: false,
    });

    const [variant] = useSelect('Variant', {
        options: ['undefined', 'depressed', 'elevated'],
        defaultValue: 'undefined',
    });

    const [type] = useSelect<React.HTMLInputTypeAttribute>('Type', {
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
        <FixtureBox hasPadding>
            <InputGroup<any>
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
                    tooltip: tooltip ? { label: 'tooltip' } : undefined,
                }}
                inputConfig={{
                    type,
                    isDisabled: disabled,
                    variant: variant === 'undefined' ? undefined : variant,
                }}
                addOn={{
                    left: leftAddOn ? { children: 'addOn' } : undefined,
                    right: rightAddOn ? { children: 'addOn' } : undefined,
                }}
                element={{
                    left: leftElement
                        ? {
                              children: (
                                  <Button
                                      size='xs'
                                      left='5px'
                                  >
                                      'Element'
                                  </Button>
                              ),
                          }
                        : undefined,
                    right: rightElement
                        ? {
                              children: (
                                  <Button
                                      size='xs'
                                      right='5px'
                                  >
                                      'Element'
                                  </Button>
                              ),
                          }
                        : undefined,
                }}
            />
        </FixtureBox>
    );
};

export default InputGroupFixture;
