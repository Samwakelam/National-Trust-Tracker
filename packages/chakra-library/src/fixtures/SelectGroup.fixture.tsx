// Note: React must be declared in all files for cosmos to work
import React, { useState } from 'react';
import { useValue } from 'react-cosmos/fixture';
import { useForm } from 'react-hook-form';

// Note: Full paths must be used in all files for cosmos to work
import { FixtureBox, SelectGroup, SelectGroupProps } from '../components';

import * as Chakra from '@chakra-ui/react';

const SelectGroupFixture = ({
    defaultValue,
    options,
}: Pick<SelectGroupProps<any, string>, 'options' | 'defaultValue'>) => {
    const {
        register,
        formState: { errors },
    } = useForm<any>();

    const [canFilter] = useValue<boolean>('Can Filter', {
        defaultValue: false,
    });

    const [hideBadge] = useValue<boolean>('Hide Badge', {
        defaultValue: false,
    });

    const [required] = useValue<boolean>('Is Required', {
        defaultValue: false,
    });

    const [disabled] = useValue<boolean>('Is Disabled', {
        defaultValue: false,
    });

    const [tooltip] = useValue<boolean>('Add Tooltip', {
        defaultValue: false,
    });

    const [value, setValue] = useState<string | undefined>(defaultValue);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>
    ) => {
        e.stopPropagation();
        e.preventDefault();

        const value = e.currentTarget.value;

        setValue(value);
    };

    return (
        <FixtureBox
            hasPadding
            gap='1rem'
        >
            <Chakra.Text>Value: {value}</Chakra.Text>
            <SelectGroup<any, string>
                name='Name'
                formRegister={{
                    register,
                    options: { required },
                }}
                errors={errors}
                label='Label'
                labelConfig={{
                    hideBadge: hideBadge,
                    tooltip: tooltip ? { label: 'tooltip' } : undefined,
                }}
                options={options}
                canFilter={canFilter}
                selectConfig={{
                    onChange: (e) => handleChange(e),
                    isDisabled: disabled,
                }}
                defaultValue={defaultValue}
            />
        </FixtureBox>
    );
};

export default {
    'Options as String': () => {
        const options = ['Option - 1', 'Option - 2', 'Option - 3'];
        return <SelectGroupFixture options={options} />;
    },
    'Options as Turple': () => {
        const options: SelectGroupProps<any, string>['options'] = [
            ['Option - 1', 1],
            ['Option - 2', 2],
            ['Option - 3', 3],
        ];
        return <SelectGroupFixture options={options} />;
    },
    'Default Value': () => {
        const options = ['Option - 1', 'Option - 2', 'Option - 3'];
        return (
            <SelectGroupFixture
                options={options}
                defaultValue='Option - 1'
            />
        );
    },
};
