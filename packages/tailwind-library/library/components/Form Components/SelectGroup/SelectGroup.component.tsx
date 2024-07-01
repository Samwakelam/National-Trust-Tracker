'use client';

import React, { ReactElement, ReactNode, useState } from 'react';
import {
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';

import { twMerge } from '../../../utilities/twMerge.util';

import { Label, LabelProps } from '..';
import { Button, Icon } from '../..';

import { SelectStyles, selectStyles } from './SelectGroup.styles';

// MARK: Types

export interface SelectGroupProps<T extends FieldValues, K extends string>
    extends SelectStyles {
    canFilter?: boolean;
    // defaultValue?: K;
    errors: FieldErrors<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    label?: LabelProps['label'];
    labelConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor'>;
    name: Path<T>;
    options: (K | [K, string | number])[];
    isDisabled?: boolean;
}

// MARK: Select Group
export const SelectGroup = <T extends FieldValues, K extends string>({
    canFilter = false,
    colorScheme,
    // defaultValue,
    divergent,
    errors,
    formRegister,
    label,
    labelConfig = { hideBadge: false },
    name,
    options,
    isDisabled,
}: SelectGroupProps<T, K>): ReactElement<SelectGroupProps<T, K>> => {
    const { register, options: formOptions } = formRegister;

    const isRequired: boolean = formOptions?.required ? true : false;

    const requiredErrorMessage =
        typeof formOptions?.required !== 'string'
            ? formOptions?.required
            : undefined;

    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const styles = selectStyles({ colorScheme, divergent });

    // MARK: Return
    return (
        <div
            data-label='select-group'
            className='flex-1 mb-24 w-full'
        >
            <Label
                htmlFor={name}
                label={label}
                isRequired={isRequired}
                className='mb-4'
                {...labelConfig}
            />

            <div className='flex flex-row items-center'>
                <select
                    className={twMerge(styles)}
                    {...register(name, formOptions)}
                    id={name}
                    required={isRequired}
                    // defaultValue={defaultValue}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    disabled={isDisabled}
                >
                    {/* {!defaultValue && !selectConfig?.placeholder && (
                            <option value=''>Select</option>
                        )} */}
                    <option value=''>Select</option>
                    {options.map((option: K | [K, string | number], index) => {
                        if (Array.isArray(option)) {
                            return (
                                <option
                                    className='bg-white-100'
                                    value={option[1]}
                                    key={`select-option-${option[0]}-${index}`}
                                >
                                    {option[0]}
                                </option>
                            );
                        }

                        return (
                            <option
                                className='bg-white-100'
                                value={option}
                                key={`select-option-${option}-${index}`}
                            >
                                {option}
                            </option>
                        );
                    })}
                </select>
                <Button
                    divergent='ghost'
                    colorScheme={colorScheme}
                    className='pointer-events-none z-[2]'
                    icon={
                        hasFocus
                            ? { icon: 'chevron-u', ariaLabel: 'chevron up' }
                            : { icon: 'chevron-d', ariaLabel: 'chevron down' }
                    }
                />
            </div>

            <p>
                {errors[name]?.message as ReactNode}
                {requiredErrorMessage && (requiredErrorMessage as ReactNode)}
            </p>
        </div>
    );
};
