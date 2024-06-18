// Note: React must be declared in all files for cosmos to work
import React from 'react';
import { useValue } from 'react-cosmos/fixture';
import { useForm } from 'react-hook-form';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox, TextareaGroup } from '../components';

import * as Chakra from '@chakra-ui/react';

const TextareaGroupFixture = ({}) => {
    const [hideBadge] = useValue<boolean>('hideBadge', {
        defaultValue: false,
    });

    const [tooltip] = useValue<boolean>('Add Tooltip', {
        defaultValue: false,
    });

    const [required] = useValue<boolean>('isRequired', {
        defaultValue: false,
    });

    const [errorMessage] = useValue<string>('Set Error Message', {
        defaultValue: '',
    });

    const [isDisabled] = useValue<boolean>('Is Disabled', {
        defaultValue: false,
    });

    const {
        register,
        formState: { errors },
    } = useForm<any>();

    return (
        <FixtureBox hasPadding>
            <TextareaGroup<any>
                name='Name'
                formRegister={{
                    register,
                    options: {
                        required: errorMessage ? errorMessage : required,
                    },
                }}
                textAreaConfig={{
                    isDisabled,
                }}
                errors={errors}
                label='Label'
                labelConfig={{
                    hideBadge: hideBadge,
                    tooltip: tooltip ? { label: 'tooltip' } : undefined,
                }}
            />
        </FixtureBox>
    );
};

export default TextareaGroupFixture;
