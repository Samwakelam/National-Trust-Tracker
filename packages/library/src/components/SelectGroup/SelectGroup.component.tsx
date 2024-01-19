import React, { ReactElement, ReactNode, useState } from 'react';
import {
    FieldErrorsImpl,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';

import { Button, Icon, Label, LabelProps } from '..';

import * as Chakra from '@chakra-ui/react';

export type SelectGroupProps<T extends FieldValues, K extends string> = {
    canFilter?: boolean;
    defaultValue?: K;
    errors: FieldErrorsImpl<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    label?: LabelProps['label'];
    labelConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor'>;
    name: Path<T>;
    options: (K | [K, string | number])[];
    selectConfig?: Chakra.SelectProps & Chakra.InputProps;
};

export const SelectGroup = <T extends FieldValues, K extends string>({
    canFilter = false,
    defaultValue,
    errors,
    formRegister,
    label,
    labelConfig = { hideBadge: false },
    name,
    options,
    selectConfig,
}: SelectGroupProps<T, K>): ReactElement<SelectGroupProps<T, K>> => {
    const { register, options: formOptions } = formRegister;

    const styles = Chakra.useMultiStyleConfig('Select', { variant: undefined });

    const isRequired: boolean = formOptions?.required ? true : false;

    const requiredErrorMessage =
        typeof formOptions?.required !== 'string'
            ? formOptions?.required
            : undefined;

    const [focused, setFocused] = useState<boolean>(false);

    return (
        <Chakra.Box
            flex={1}
            mb='1.5rem'
            data-label='SelectGroup'
            w='100%'
        >
            <Chakra.FormControl isInvalid={errors[name] ? true : false}>
                <Label
                    htmlFor={name}
                    label={label}
                    isRequired={isRequired}
                    {...labelConfig}
                />
                {canFilter ? (
                    <Chakra.InputGroup __css={styles.group}>
                        <Chakra.Input
                            {...register(name, formOptions)}
                            id={name}
                            placeholder='Select'
                            isRequired={isRequired}
                            backgroundColor='white'
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            {...selectConfig}
                            list={`datalist-${name}`}
                        />
                        <Chakra.InputRightElement __css={styles.element}>
                            <Button
                                variant='unstyled'
                                icon={{
                                    ariaLabel: 'chevron select',
                                    icon: focused ? 'chevron-u' : 'chevron-d',
                                    w: '1.25rem',
                                    h: '1.25rem',
                                }}
                            />
                        </Chakra.InputRightElement>
                        <datalist
                            id={`datalist-${name}`}
                            onClick={() => setFocused(false)}
                            defaultValue={
                                selectConfig?.defaultValue || undefined
                            }
                        >
                            {options.map(
                                (option: K | [K, string | number], index) => {
                                    if (Array.isArray(option)) {
                                        return (
                                            <option
                                                value={option[1]}
                                                key={`select-option-${option[0]}-${index}`}
                                            >
                                                {option[0]}
                                            </option>
                                        );
                                    }

                                    return (
                                        <option
                                            value={option}
                                            key={`select-option-${option}-${index}`}
                                        >
                                            {option}
                                        </option>
                                    );
                                }
                            )}
                        </datalist>
                    </Chakra.InputGroup>
                ) : (
                    <Chakra.Select
                        {...register(name, formOptions)}
                        id={name}
                        isRequired={isRequired}
                        defaultValue={defaultValue}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        icon={
                            <Icon
                                icon={focused ? 'chevron-u' : 'chevron-d'}
                                ariaLabel='select chevron'
                            />
                        }
                        {...selectConfig}
                    >
                        {!defaultValue && !selectConfig?.placeholder && (
                            <option value=''>Select</option>
                        )}
                        {options.map(
                            (option: K | [K, string | number], index) => {
                                if (Array.isArray(option)) {
                                    return (
                                        <option
                                            value={option[1]}
                                            key={`select-option-${option[0]}-${index}`}
                                        >
                                            {option[0]}
                                        </option>
                                    );
                                }

                                return (
                                    <option
                                        value={option}
                                        key={`select-option-${option}-${index}`}
                                    >
                                        {option}
                                    </option>
                                );
                            }
                        )}
                    </Chakra.Select>
                )}

                <Chakra.FormErrorMessage>
                    {errors[name]?.message as ReactNode}
                    {requiredErrorMessage &&
                        (requiredErrorMessage as ReactNode)}
                </Chakra.FormErrorMessage>
            </Chakra.FormControl>
        </Chakra.Box>
    );
};
