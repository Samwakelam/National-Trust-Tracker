import React, { useRef, useState, useEffect } from 'react';
import {
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import { Icon, IconProps } from '../../Icon';
import { RadioStyles, radioStyles } from './RadioGroup.styles';
import { Label } from '../Label';
import { twMerge } from 'tailwind-merge';

type RadioProps = {
    icon?: IconProps;
    label?: string;
    value: string;
};

export interface RadioGroupProps<T extends FieldValues> extends RadioStyles {
    errors: FieldErrors<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    isDisabled: boolean;
    legend?: string;
    name: Path<T>;
    radios: RadioProps[];
}

export const RadioGroup = <T extends FieldValues>({
    colorScheme,
    divergent,
    errors,
    formRegister,
    isDisabled,
    legend,
    name,
    radios,
}: RadioGroupProps<T>) => {
    const { register, options } = formRegister;

    const styles = radioStyles({ colorScheme, divergent });

    const isRequired: boolean = options?.required ? true : false;

    return (
        <div className='flex flex-col items-start'>
            {legend && <legend className='capitalize'>{legend}</legend>}
            {radios.map(({ label, value, icon }: RadioProps) => {
                return (
                    <div
                        className='flex flex-row gap-8 items-center'
                        key={`${label ? label : name}-${value}`}
                    >
                        <input
                            {...register(name, options)}
                            type='radio'
                            id={`${label ? label : value}`}
                            value={value}
                            data-label='radio'
                            // invalid={!!errors?.[name]}
                            disabled={isDisabled}
                            className={twMerge(styles)}
                        />
                        <Label
                            htmlFor={`${name}-${label}`}
                            label={label}
                            isRequired={isRequired}
                        />
                    </div>
                );
            })}
        </div>
    );
};
