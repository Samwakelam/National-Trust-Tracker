'use client';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import { Label, LabelProps } from '../Label';
import { twMerge } from '../../../utilities/twMerge.util';
import { scrollbar } from '../../../utilities/className.utils';
import { CheckboxStyles, checkboxStyles } from './CheckboxGroup.styles';

type CheckboxProps = {
    label: LabelProps['label'];
    labelConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor'>;
};

export interface CheckboxGroupProps<T extends FieldValues>
    extends CheckboxStyles {
    checkboxes: CheckboxProps[];
    errors: FieldErrors<T>;
    formRegister: {
        register: UseFormRegister<T>;
        options?: RegisterOptions<T, Path<T>>;
    };
    legend?: string;
    legendConfig?: Omit<LabelProps, 'isRequired' | 'htmlFor'>;
    name: Path<T>;
    isChecked?: string[] | boolean | undefined;
    isDisabled?: boolean;
}

export const CheckboxGroup = <T extends FieldValues>({
    checkboxes,
    colorScheme,
    divergent,
    errors,
    formRegister,
    legend,
    legendConfig,
    name,
    isDisabled,
}: CheckboxGroupProps<T>): ReactElement<CheckboxGroupProps<T>> => {
    const { register, options } = formRegister;

    const styles = checkboxStyles({ colorScheme, divergent });

    const isRequired: boolean = options?.required ? true : false;
    const isSingular = checkboxes.length === 1;

    const isInvalid = errors[name] ? true : false;

    return (
        <div
            className='flex flex-col gap-8 w-full'
            data-label='checkbox-group'
        >
            {legend && (
                <Label
                    htmlFor={`${name}`}
                    label={legend}
                    isRequired={isRequired}
                    {...legendConfig}
                />
            )}
            <div
                className={twMerge(
                    scrollbar,
                    'flex flex-col gap-8 bg-transparent max-h-208 px-8'
                )}
            >
                {checkboxes.map(({ label, labelConfig }: CheckboxProps) => {
                    return (
                        <div
                            className='flex flex-row gap-8 items-center'
                            key={`${name}-${label}`}
                        >
                            <input
                                type='checkbox'
                                data-label='checkbox'
                                {...register(name, options)}
                                id={`${name}-${label}`}
                                value={label}
                                disabled={isDisabled}
                                className={twMerge(styles)}
                            />

                            <Label
                                htmlFor={`${name}-${label}`}
                                label={label}
                                isRequired={isRequired}
                                hideBadge={!isSingular}
                                {...labelConfig}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
