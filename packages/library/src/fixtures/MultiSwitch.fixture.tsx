// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelect } from 'react-cosmos/fixture';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox, MultiSwitch } from '../components';
import { colorScheme } from '../utils/colours.utils';

import * as Chakra from '@chakra-ui/react';

const MultiSwitchFixture = () => {
    const {
        register,
        formState: { errors },
    } = useForm<any>();

    const [scheme] = useSelect('Colour Scheme', {
        options: colorScheme,
        defaultValue: 'gray',
    });

    return (
        <FixtureBox
            hasPadding
            gap='16'
        >
            <Chakra.Heading
                as='h2'
                size='0.75rem'
                color='gray'
            >
                Basic Switch Group
            </Chakra.Heading>
            <MultiSwitch<any>
                switches={[
                    { label: 'Switch 1', value: '1' },
                    { label: 'Switch 2', value: '2' },
                    { label: 'Switch 3', value: '3' },
                ]}
                name='multiSwitchGroup1'
                formRegister={{
                    register,
                }}
                errors={errors}
                colorScheme={scheme}
            />
            <Chakra.Heading
                as='h2'
                size='0.75rem'
                color='gray'
            >
                Disabled Switches
            </Chakra.Heading>
            <MultiSwitch<any>
                switches={[
                    {
                        label: 'Switch 1',
                        value: '1',
                        config: { isDisabled: true },
                    },
                    {
                        label: 'Switch 2',
                        value: '2',
                        config: { isDisabled: true },
                    },
                    { label: 'Switch 3', value: '3' },
                ]}
                name='multiSwitchGroup2'
                formRegister={{
                    register,
                }}
                errors={errors}
                colorScheme={scheme}
            />
            <Chakra.Heading
                as='h2'
                size='0.75rem'
                color='gray'
            >
                Default Value Switch
            </Chakra.Heading>
            <MultiSwitch<any>
                switches={[
                    { label: 'Switch 1', value: '1' },
                    { label: 'Switch 2', value: '2' },
                    { label: 'Switch 3', value: '3' },
                ]}
                name='multiSwitchGroup3'
                formRegister={{
                    register,
                }}
                errors={errors}
                switchConfig={{ defaultValue: '2' }}
                colorScheme={scheme}
            />
            <Chakra.Heading
                as='h2'
                size='0.75rem'
                color='gray'
            >
                Invalid Switch
            </Chakra.Heading>
            <MultiSwitch<any>
                switches={[
                    {
                        label: 'Switch 1',
                        value: '1',
                        config: { isInvalid: true },
                    },
                    { label: 'Switch 2', value: '2' },
                    { label: 'Switch 3', value: '3' },
                ]}
                name='multiSwitchGroup3'
                formRegister={{
                    register,
                }}
                errors={errors}
                colorScheme={scheme}
            />
        </FixtureBox>
    );
};

export default MultiSwitchFixture;
