// Note: React must be declared in all files for cosmos to work
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Note: Full paths must be used in all files for cosmos to work
import {
    Button,
    InputAndSelectBar,
    InputGroup,
    InputGroupProps,
    SelectGroupProps,
    SelectGroup,
    FixtureBox,
} from '../components';

import * as Chakra from '@chakra-ui/react';
import { useValue } from 'react-cosmos/fixture';

const InputAndSelectBarFixture = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<any>({ mode: 'onChange' });

    const [hasSubmitCTA] = useValue<boolean>('Has Submit CTA', {
        defaultValue: false,
    });

    const inputGroup: InputGroupProps<any> = {
        formRegister: { register },
        errors: errors,
        name: 'inputGroup',
        label: 'Input',
        labelConfig: { hideBadge: true },
        inputConfig: {
            placeholder: 'placeholder... ',
        },
    };

    const selectGroup: SelectGroupProps<any, string> = {
        formRegister: { register },
        errors: errors,
        name: 'inputGroup',
        label: 'Select',
        labelConfig: { hideBadge: true },
        options: ['options 1', 'options 2', 'options 3'],
    };

    const [inputs, setInputs] = useState<('select' | 'input')[]>([]);

    const handleAddToInputs = (type: 'select' | 'input') => {
        setInputs((prev) => [...prev, type]);
    };

    const handleRemoveFromInputs = (index: number) => {
        const prev = [...inputs];
        prev.splice(index, 1);
        const curr = prev;
        setInputs(curr);
    };

    const onSubmit = (data: any) => {
        console.log('data: ', data);
    };

    return (
        <FixtureBox hasPadding>
            <Chakra.HStack mb='2rem'>
                <Button
                    icon={{ icon: 'plus', ariaLabel: 'add select' }}
                    onClick={() => {
                        handleAddToInputs('select');
                    }}
                >
                    Add Select
                </Button>

                <Button
                    icon={{ icon: 'plus', ariaLabel: 'add select' }}
                    onClick={() => {
                        handleAddToInputs('input');
                    }}
                >
                    Add Input
                </Button>
            </Chakra.HStack>
            <InputAndSelectBar
                submitCTA={
                    hasSubmitCTA
                        ? {
                              children: 'Submit',
                              onClick: handleSubmit(onSubmit),
                          }
                        : undefined
                }
            >
                {/* @ts-ignore - asking for react fraction <></> but component needs to be able to count children length */}
                {inputs.length > 0 &&
                    inputs.map((input, index) => {
                        if (input === 'input') {
                            return (
                                <InputGroup<any>
                                    {...inputGroup}
                                    key={`input-${index}`}
                                />
                            );
                        }
                        if (input === 'select') {
                            return (
                                <SelectGroup<any, string>
                                    {...selectGroup}
                                    key={`select-${index}`}
                                />
                            );
                        }
                    })}
            </InputAndSelectBar>
            <Chakra.HStack
                justifyContent='space-around'
                w='100%'
                pb='2rem'
            >
                {inputs.map((_, index) => {
                    return (
                        <Button
                            icon={{ icon: 'remove', ariaLabel: 'remove' }}
                            onClick={() => handleRemoveFromInputs(index)}
                            key={`button-${index}`}
                        />
                    );
                })}
            </Chakra.HStack>
        </FixtureBox>
    );
};

export default InputAndSelectBarFixture;
